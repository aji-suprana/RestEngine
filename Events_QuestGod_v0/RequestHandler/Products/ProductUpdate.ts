import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../../Engine/index"
import Product,{IProduct} from '../../Models/product';
import User_Product, {IUser_Product} from '../../Models/user-product';

export function ProductUpdate(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("UpdateProduct",res,req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;

    if(userType == "Partner" || userType == "Admin")
    {
        const id = req.body.productId;

        Product.updateOne({_id: id}, {$set: req.body})
            .then(function(result:Document){
                //responseHelper.HTTP_OK_JSONResponse(result);
                
                Product.find({_id: id})
                    .exec()
                    // .select('_id owner name productType')
                    .then(function(result:any) {
                        return responseHelper.HTTP_OK_JSONResponse({
                            'message': 'product updated',
                            result
                        })
                    })

            })
            .catch(err => {
                res.status(500).json(err);
            })
    }else{
        return responseHelper.HTTP_Unauthorized("invalid access!Parner account is required");
    }
 } 

 