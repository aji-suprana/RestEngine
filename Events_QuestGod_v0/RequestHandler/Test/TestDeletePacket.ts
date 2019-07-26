import mongoose from 'mongoose';
import {Request, Response, NextFunction} from 'express-serve-static-core';
import Packet, {IPacket} from '../../Models/packet';

import {ResponseHelper} from '../../../Engine/index';

export function TestDeletePacket(req:Request, res:Response, next:NextFunction) {
    const packetId = req.body.packetId;
    const transactionId = req.body.transactionId;
    const responseHelper = new ResponseHelper("TestDeletePacket", res, req);

    Packet
    .find({"_id": packetId})
    .exec()
    .then( (packet:any) => {
        DeleteFromContainer(packetId, transactionId,req,responseHelper);
    })
    .catch()

    function DeleteFromContainer(packetId:mongoose.Schema.Types.ObjectId, transactionId:mongoose.Schema.Types.ObjectId,req:Request, responseHelper:ResponseHelper)
    {
       //CHECK IF USER HAS CONTAINER FOR OWNED PRODUCTS
       Packet.findOne({"_id":packetId})
       .exec()
       .then((value:any)=>{
           var productContainer:IPacket;
           //use newly created one if not found, else use found ownedProduct
           if(value === null){
              return responseHelper.HTTP_InternalServerError({message:"invalid user!"});
           }else{
               productContainer = value;
           }
   
           var products = productContainer.packet;
           for( var i = 0; i < productContainer.packet.length; i++){ 
               if ( productContainer.packet[i].toString() === transactionId.toString()) {
                   productContainer.packet.splice(i, 1); 
               }
            }
           productContainer.packet = products;
   
           productContainer.save()
           .catch(function(err:any){
               responseHelper.HTTP_InternalServerError(err);
           })
       })
    }
}