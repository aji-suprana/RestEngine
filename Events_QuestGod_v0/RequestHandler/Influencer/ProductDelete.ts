import mongoose, {Document} from 'mongoose';

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import Influencer_Product, {IInfluencer_Product} from "../../Models/influencer-product";
import Influencer_Channel, {IInfluencer_Channel} from "../../Models/influencer-channel";

import {ResponseHelper} from "../../../Engine/index";

export function InfluencerProductDelete(req:Request, res: Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("InfluencerProductDelete", res, req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;

    if ( userType == "Influencer" ) {
        const productId = req.body.productId

        Influencer_Product
            .deleteOne({ _id: productId })
            .exec()
            .then( function(result:any) {
                DeleteFromContainer(productId, req, responseHelper);
                return responseHelper.HTTP_OK_JSONResponse({
                    message: 'influencer product successfully removed',
                    result
                })
            })
            .catch(err => {
                res.status(500).json(err);
            })
    } else {
        return responseHelper.HTTP_Unauthorized("Invalid access! Influencer account is required");
    }
}

function DeleteFromContainer(productID:mongoose.Schema.Types.ObjectId, req: Request, responseHelper: ResponseHelper) {
    Influencer_Channel
        .findOne({ "_id": req.body.userData.influencerId})
        .exec()
        .then( (value:any) => {
            var channelContainer:IInfluencer_Channel
            if (value === null) {
                return responseHelper.HTTP_InternalServerError({ message: "Invalid user" });
            } else {
                channelContainer = value;
            }

            var products = channelContainer.products;
            for ( var i = 0; i < channelContainer.products.length; i++ ) {
                console.log(channelContainer.products[i]);
                if ( channelContainer.products[i].toString() === productID.toString()) {
                    channelContainer.products.splice(i, 1);
                }
            }
            channelContainer.products = products;

            channelContainer.save()
            .catch(function(err:any) {
                responseHelper.HTTP_InternalServerError(err);
            })
        })
}