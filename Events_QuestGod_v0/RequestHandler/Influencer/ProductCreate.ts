import mongoose, {Document} from 'mongoose';

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../../Engine/index";
import Influencer_Product, {IInfluencer_Product} from "../../Models/influencer-product";
import Influencer_Channel, {IInfluencer_Channel} from "../../Models/influencer-channel";

export function InfluencerProductCreate(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("InfluencerProductCreate",res,req);
    responseHelper.JsonRequest_Succeded();

    /**
     * Request
     * @body : "name", "command", "price"
     */

    const userType = req.body.userData.userType;

    if (userType == "Influencer") {
        Influencer_Product
            .find({"name": req.body.name})
            .exec()
            .then((product:any) => {
                if (product.length >= 1) {
                    return responseHelper.HTTP_UnprocessableEntity(
                        { message: "Influencer Product Existed" }
                    );
                }

                const productModel = new Influencer_Product({
                    _id: new mongoose.Types.ObjectId,
                    ownerId: req.body.userData.influencerId,
                    name: req.body.name,
                    command: req.body.command,
                    price: req.body.price,
                })

                productModel.save()
                
                .then(function(result:any) {
                    SaveToContainer(productModel._id, req, responseHelper);
                    responseHelper.HTTP_OK_JSONResponse({
                        "message" : "influencer product created",
                        result
                    })
                })

                .catch (err => {
                    console.log(err);
                })
            })
    } else {
        return responseHelper.HTTP_Unauthorized("Invalid access! influencer account required")
    }
}

function SaveToContainer(productID:mongoose.Schema.Types.ObjectId, req: Request, responseHelper: ResponseHelper)
{
    Influencer_Channel
        .findOne({ "_id": req.body.userData.influencerId })
        .exec()
        .then( (value:any) => {
            var influencerChannelFound:IInfluencer_Channel;
            influencerChannelFound = value;

            influencerChannelFound.products.push(productID);

            influencerChannelFound.save()
            .catch(function(err:any) {
                responseHelper.HTTP_InternalServerError(err);
            })
        })
}