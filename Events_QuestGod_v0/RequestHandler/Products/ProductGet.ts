const bcrypt = require('bcrypt');

import mongoose, {Document} from 'mongoose';

import {Response} from 'express-serve-static-core';
import {Request} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';
import Product from '../../Models/product';

import {ResponseHelper} from "../../../Engine/index";

export function ProductGet( req:Request, res:Response, next:NextFunction ) {
    const responseHelper = new ResponseHelper('GetProduct', res, req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;
    const id = req.body.productId;

    if (userType == 'Partner' )
    {
        Product.find()
            .exec()
            .then(function(result:any){
                console.log(result);
                responseHelper.HTTP_OK_JSONResponse({
                    "message" : "GetProduct",
                    result,
                });
            })
            .catch(function(err:any) {
                console.log(err);
                responseHelper.HTTP_InternalServerError(err);
            })
    } else {
        return responseHelper.HTTP_Unauthorized('message');
    }
}