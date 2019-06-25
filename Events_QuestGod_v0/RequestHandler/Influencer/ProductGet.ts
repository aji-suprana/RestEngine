import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Product, {IInfluencer_Product} from '../../Models/influencer-product';
import {ResponseHelper} from '../../../Engine/index';

export function InfluencerProductGet( req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("GetInfluencerProduct", res, req);
    responseHelper.JsonRequest_Succeded();


    // if (userType == "Influencer") {
        Influencer_Product
        .find()
        .exec()
        .then(function(result:any) {
            console.log(result);
            responseHelper.HTTP_OK_JSONResponse({
                "message": "GetProduct",
                result,
            })
        })
    // } else {
    //     return responseHelper.HTTP_Unauthorized("Invalid access! influencer account is required");
    // }
}

