import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Product, {IInfluencer_Product} from '../../Models/influencer-product';
import {ResponseHelper} from '../../../Engine/index';

export function InfluencerProductUpdate(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("InfluencerProductDelete", res, req);
    responseHelper.JsonRequest_Succeded();

    /**
     * Request
     * @body : "name/command/price"
     */

    const userType = req.body.userData.userType;

    if (userType == "Influencer") {
        var productId = req.body.productId;
        console.log(typeof(productId));
        Influencer_Product
            .updateOne( { _id: productId}, {$set:req.body} )
            .then(function(result:Document) {
                Influencer_Product
                    .find({_id: productId})
                    .exec()
                    .then(function(result:any) {
                        return responseHelper.HTTP_OK_JSONResponse({
                            'message' : 'influencer product updated',
                            result
                        });
                    })
            })
            .catch( function(err){
                res.status(500).json(err);
            })
    } else {
        return responseHelper.HTTP_Unauthorized('Invalid access! Influencer account is required');
    }
}
