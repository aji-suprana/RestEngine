import mongoose from 'mongoose';
import {Request, Response, NextFunction} from 'express-serve-static-core';

import Packet, {IPacket} from '../../Models/packet';
import {ResponseHelper} from '../../../Engine/index';

export function TestConnection(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("TestConnection", res, req);

    /**
     * url /test/connection
     * @body influencerId
     * Note: generate influencerId from json decode > userData.influencerId 
     */
    
    const influencerId = req.body.influencerId;

    Packet
    .find({ "_id": influencerId })
    .exec()
    .then((packet:any) => {

        if (packet.length >= 1) {
            waitingForPacket(influencerId)
        }

        else {

            const packetModel = new Packet({
                _id: influencerId
            });
    
            packetModel.save();

            waitingForPacket(influencerId);
            
        }
    })
    .catch( err => {
        console.log(err);
    });

    async function waitingForPacket(id:mongoose.Schema.Types.ObjectId) {
        let promise = new Promise( (resolve, reject) => {
            console.log('async function executed');

            Packet
            .find({ _id: id })
            .exec()
            .then( (result) => {
                var packet = result[0].packet;
                console.log('packet result', result);

                if (packet.length < 1) {
                    waitingForPacket(id);
                } else {
                    //get some packet
                    resolve('done');
                    return responseHelper.HTTP_OK_JSONResponse({
                        message: "you've get some packet"
                    })
                }
            })
        })
    }
}
