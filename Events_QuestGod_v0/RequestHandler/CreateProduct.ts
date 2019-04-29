const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../Engine/index"
import Product,{IProduct} from '../Models/product';
import ProductContainer, {IProductContainer} from '../Models/productContainer';

export function CreateGame(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("CreateGame",res,req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;

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
            .then(function(result:Document){
                SaveToContainer(productModel._id,req,responseHelper);
                responseHelper.HTTP_OK_DocResponse(result);
            })
            .catch(function(err:any){
                responseHelper.HTTP_InternalServerError(err);
            })
        })
    }else{
        return responseHelper.HTTP_Unauthorized("invalid access!Parner account is required");
    }
 } 

 function SaveToContainer(productID:mongoose.Schema.Types.ObjectId,req:Request, responseHelper:ResponseHelper)
 {
    //CHECK IF USER HAS CONTAINER FOR OWNED PRODUCTS
    ProductContainer.findOne({"_id":req.body.userData.userId})
    .exec()
    .then((value:any)=>{
        var productContainer:IProductContainer;
        //use newly created one if not found, else use found ownedProduct
        if(value === null){
            const productContainerModel = new ProductContainer({
                _id: req.body.userData.userId,
                products: []
            });
            productContainer = productContainerModel;
            

        }else{
            productContainer = value;
        }

        productContainer.products.push(productID);

        productContainer.save()
        .catch(function(err:any){
            responseHelper.HTTP_InternalServerError(err);
        })
    })
 }