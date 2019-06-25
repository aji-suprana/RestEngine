import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import User, {IUser} from '../../../Events_Authentication_v0/Models/user';
import Influencer_Product, {IInfluencer_Product} from '../../Models/influencer-product';
import {ResponseHelper} from '../../../Engine/index';

export function UserSpentPoint(req:Request, res: Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("UserSpentPoint", res, req);  

    const userId = req.body.userData.userId;
    const influencerProductId = req.body.productId;
    const userType = req.body.userData.userType;

    if (userType == "User") {
        // get influencer product
        Influencer_Product
            .find({ _id: influencerProductId })
            .then(function(result:any) {
                
                //influencer product point
                const productPoint = result[0].price;
    
                //get user exist point
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
                            //calculate new point
                            const newPoint = parseInt(userPoint) - parseInt(productPoint);
                        
                            //update user point
                            User
                                .updateOne({ _id: userId}, { $set: {"point" : newPoint} })
                                .then(function(result:any) {
                                    return responseHelper.HTTP_OK_JSONResponse({
                                        "message": "success",
                                        result
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