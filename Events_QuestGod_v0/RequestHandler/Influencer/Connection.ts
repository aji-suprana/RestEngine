import mongoose, {Document} from 'mongoose';

import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer, {IInfluencer} from '../../../Events_Authentication_v0/Models/influencer';
import {ResponseHelper} from '../../../Engine/index';

export function InfluencerConnection(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("InfluencerConnection", res, req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;

    /**
     * Request
     * @body : "ipAddress", "port"
     */

    if (userType == "Influencer") {
        Influencer
        .updateOne({ _id: req.body.userData.influencerId }, {$set: {ipAddress: req.body.ipAddress, port : req.body.port }})
        .exec()
        .then(function(result:any) {
            console.log(result);

            Influencer
            .findOne({ _id: req.body.userData.influencerId })
            .exec()
            .then(function(result:any) {
                console.log(result);
                return responseHelper.HTTP_OK_JSONResponse({
                    message: "success",
                    ipAddress: result.ipAddress,
                    port: result.port
                });
            })
        })
        .catch(function(err:any){
            console.log(err);
            return responseHelper.HTTP_InternalServerError(err);
        })
    }
}