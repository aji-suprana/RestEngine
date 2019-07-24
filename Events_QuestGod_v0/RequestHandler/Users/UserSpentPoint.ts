import mongoose, {Document} from 'mongoose';
import net from 'net';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import User, {IUser} from '../../../Events_Authentication_v0/Models/user';
import Influencer_Product, {IInfluencer_Product} from '../../Models/influencer-product';
import Influencer, {IInfluencer} from '../../../Events_Authentication_v0/Models/influencer';
import {ResponseHelper} from '../../../Engine/index';

export function UserSpentPoint(req:Request, res: Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("UserSpentPoint", res, req);

    /**
     * Request
     * @body : "productId"
     */

    const userId = req.body.userData.userId;
    const influencerProductId = req.body.productId;
    const userType = req.body.userData.userType;

    if (userType == "User") {
        
        /**
         * Get Influencer Product Info
         */
        Influencer_Product
        .find({ _id: influencerProductId })
        .then(function(result:any) {

            const influencerId = result[0].ownerId;
            const productPoint = result[0].price;
            const command = result[0].command;

            /**
             * Get User Point
             */
            User
            .find({ _id: userId})
            .then(function(result:any) {
                const userPoint = result[0].point;

                // check if user point lower than product price point
                if (userPoint <= productPoint) {
                    return responseHelper.HTTP_UnprocessableEntity({
                        message: "fail",
                    });
                } else {
                    const newPoint = parseInt(userPoint) - parseInt(productPoint);
                
                    //update user point
                    User
                    .updateOne({ _id: userId}, { $set: {"point" : newPoint} })
                    .then(function(result:any) {

                        /**
                         * Get Influencer Ip Address & Port
                         */

                        Influencer
                        .findOne( {_id: influencerId} )
                        .then(function(result:any) {
                            const ipAddress = result.ipAddress;
                            const port = result.port;
                            sendCommandToInfluencer(ipAddress, port, command);
                            return responseHelper.HTTP_OK_JSONResponse({
                                message: "success"
                            })
                        })
                    })
                    .catch(function(err:any){
                        console.log(err);
                    })

                }
            })
        })
    } else {
        return responseHelper.HTTP_Unauthorized("Invalid! user account is required");
    }
}

function sendCommandToInfluencer(ipAddress:string, port:number, command:number){
    const client = new net.Socket();

    client.connect(port, ipAddress, function() {
        console.log('Client connected to ' + ipAddress + ':' + port);
        client.write("Command = " + command);
    });

    client.on('data',function(data) {
        console.log('Server : ' + data);
    });

    client.on('close', function() {
        console.log('connection closed');
    });

    client.on('error', function(err) {
        console.log(err);
    })
}