import {Request, Response, NextFunction} from 'express-serve-static-core';

import mongoose from 'mongoose';
import Packet from '../../Models/packet';
import Transaction from '../../Models/transaction';
import User from '../../../Events_Authentication_v0/Models/user';
import Influencer_Product from '../../Models/influencer-product';

import {ResponseHelper} from '../../../Engine/index';

export function TransactionUpdate(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("TransactionUpdate", res, req);
    responseHelper.JsonRequest_Succeded();

    const transactionId = req.body.transactionId
    const status = req.body.status;
    const influencerId = req.body.userData.influencerId;

    Transaction
    .updateOne({ _id: transactionId }, { $set: {status: status } })
    .exec()
    .then( (result) => {

        if (status == 1) {
            Transaction
            .find({ _id: transactionId })
            .exec()
            .then( (transaction) => {
                const productId = transaction[0].productId;
                const userId = transaction[0].userId;

                deletePacket(influencerId, transactionId);
                calculateNewPoint(productId, userId, req, responseHelper);
            })
        }
        return responseHelper.HTTP_OK_JSONResponse({
            message: "status updated"
        })
    })
    .catch(err => {
        console.log(err);
    })

    function calculateNewPoint(productId:mongoose.Schema.Types.ObjectId, userId: mongoose.Schema.Types.ObjectId, req:Request, responseHelper:ResponseHelper){
        Influencer_Product
        .find({ _id: productId })
        .exec()
        .then( (product:any) => {
            const productPoint = product[0].price;
            console.log('product point', productPoint);
            
            User
            .find({ _id: userId })
            .exec()
            .then( (user:any) => {
                const userPoint = user[0].point;
                console.log('user point', userPoint);
                const newPoint = parseInt(userPoint) - parseInt(productPoint);
                
                User
                .updateOne({ _id: userId }, {$set: {point: newPoint} })
                .exec()
                .then( (result) => {
                    return responseHelper.HTTP_OK_JSONResponse({
                        message: "success"
                    })
                })
            })
            .catch( err => {
                console.log(err);
            })
        })
        .catch( err => {
            console.log(err);
        })
    }

    function deletePacket(influencerId:mongoose.Schema.Types.ObjectId, transactionId:mongoose.Schema.Types.ObjectId) {
        

        Packet
        .find({ _id: influencerId })
        .exec()
        .then( (packet:any) => {
            console.log('packet list', packet[0].packet.length);
            const packetList = packet[0].packet;
            for (var i = 0; i < packetList.length; i++) {
                if (packetList[i].toString() == transactionId.toString()) {
                    packetList.splice(i, 1);
                }
            }

            console.log('packet list after delete', packetList);
            packet[0].packet = packetList;
            packet[0].save();
        })
        .catch(err => {
            console.log(err);
        })
    }
}