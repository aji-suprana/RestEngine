import mongoose from 'mongoose';
import {Request, Response, NextFunction} from 'express-serve-static-core';
import Transaction, {ITransaction} from '../../Models/transaction';
import Influencer_Product, {IInfluencer_Product} from '../../Models/influencer-product';

import {ResponseHelper} from '../../../Engine/index';
import Packet, { IPacket } from '../../Models/packet';

export function TestUserSpentPoint(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("TestUserSpentpoint", res, req);

    const productId = req.body.productId;
    const userId = req.body.userId;

    /**
     * url: /test/userspentpoint
     * @body : productId, userId
     * Note: <influencerId> generate from jsondecode > userData.influencerId
     */

    //find productId
    Influencer_Product
    .find({ _id: productId })
    .exec()
    .then( (product:any) => {
        // if product exist
            if (product.length >= 0) {
                //get ownerId(influencerId) from result
                const influencerId = product[0].ownerId;
                console.log('influencer id = ', influencerId);
            }

            else {
                return responseHelper.HTTP_UnprocessableEntity({ message: "product not exist"})
            }

            Transaction
            .find()
            .exec()
            .then( (transaction:any) => {
                const transactionModel = new Transaction({
                    _id: new mongoose.Types.ObjectId,
                    productId: productId,
                    userId: userId
                });
        
                transactionModel
                .save()
                .then( (result:any) => {
                    saveTransactionToInfluencerPacket(product[0].ownerId, transactionModel._id,req, responseHelper);
                })
            })
            .catch()


    })



    function saveTransactionToInfluencerPacket(influencerId:mongoose.Schema.Types.ObjectId, transactionId:mongoose.Schema.Types.ObjectId, req:Request, responseHelper:ResponseHelper){
        console.log('influencerid', influencerId);
        console.log(typeof(influencerId));
        
        Packet
        .findOne({ "_id": influencerId })
        .exec()
        .then( (value:any) => {
            
            if (value === null) {
                return responseHelper.HTTP_UnprocessableEntity({ message: "influencer offline"});
            }
            else {
                var packetFound:IPacket;
                packetFound = value;

                packetFound.packet.push(transactionId);
                packetFound.save();

                return responseHelper.HTTP_OK_JSONResponse({
                    message: "packet send to influencer"
                })
            }
        })
    }
}