const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../../Engine/index"
import Product,{IProduct} from '../../Models/product';
import User_Product, {IUser_Product} from '../../Models/user-product';

export function ProductCreate(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("CreateProduct",res,req);
    responseHelper.JsonRequest_Succeded();

    
    const userType = 'Partner';

    if(userType == "Partner" || userType == "Admin")
    {
        const object:Object = {}
        
        Product.find({"name":req.body.name})
        .exec()
        .then((product:any)=>{
            //if product existed
            if(product.length >= 1){
                return responseHelper.HTTP_UnprocessableEntity(
                    {message : "product Existed"}
                );
            }
    
            const productModel = new Product({
                _id: new mongoose.Types.ObjectId,
                owner: req.body.userData.userId,
                name: req.body.name,
                productType : req.body.productType
            })
    
            productModel.save()
            .then(function(result:any){
                SaveToContainer(productModel._id,req,responseHelper);
                responseHelper.HTTP_OK_JSONResponse({
                    "message": "product created",
                    result
                });
            })
            .catch(function(err:any){
                responseHelper.HTTP_InternalServerError(err);
            })
        })
    }else{
        return responseHelper.HTTP_Unauthorized("invalid access!Partner account is required");
    }
 } 

 function SaveToContainer(productID:mongoose.Schema.Types.ObjectId,req:Request, responseHelper:ResponseHelper)
 {
    //CHECK IF USER HAS CONTAINER FOR OWNED PRODUCTS
    User_Product.findOne({"_id":req.body.userData.userId})
    .exec()
    .then((value:any)=>{
        var userProductFound:IUser_Product;
        //use newly created one if not found, else use found ownedProduct
        if(value === null){
            const user_productModel = new User_Product({
                _id: req.body.userData.userId,
                products: []
            });
            userProductFound = user_productModel;
            

        }else{
            userProductFound = value;
        }

        userProductFound.products.push(productID);

        userProductFound.save()
        .catch(function(err:any){
            responseHelper.HTTP_InternalServerError(err);
        })
    })
 }