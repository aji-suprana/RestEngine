const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../../Engine/index"
import Product,{IProduct} from '../../Models/product';
import User_Product, {IUser_Product} from '../../Models/user-product';
import Transaction from '../../Models/transaction';

export function ProductDelete(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("DeleteProduct",res,req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;
    //var tags = req.params.tags.split(',');
    //console.log();
    if(userType == "Partner" || userType == "Admin")
    {
        var toDelete = req.body.productId;
        Product
        .deleteOne({ _id: toDelete})
        .exec()
        .then(function(result:any) {
            // DeleteFromContainer(toDelete,req,responseHelper);
            return responseHelper.HTTP_OK_JSONResponse({
                message: "succesfully removed",
                result
            });
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }else{
        return responseHelper.HTTP_Unauthorized("invalid access!Parner account is required");
    }

    //return responseHelper.HTTP_OK_JSONResponse({});
 } 

 function DeleteFromContainer(productID:mongoose.Schema.Types.ObjectId,req:Request, responseHelper:ResponseHelper)
 {
    //CHECK IF USER HAS CONTAINER FOR OWNED PRODUCTS
    User_Product.findOne({"_id":req.body.userData.userId})
    .exec()
    .then((value:any)=>{
        var productContainer:IUser_Product;
        //use newly created one if not found, else use found ownedProduct
        if(value === null){
           return responseHelper.HTTP_InternalServerError({message:"invalid user!"});
        }else{
            productContainer = value;
        }

        var products = productContainer.products;
        for( var i = 0; i < productContainer.products.length; i++){ 
            if ( productContainer.products[i].toString() === productID.toString()) {
                productContainer.products.splice(i, 1); 
            }
         }
        productContainer.products = products;

        productContainer.save()
        .catch(function(err:any){
            responseHelper.HTTP_InternalServerError(err);
        })
    })
 }