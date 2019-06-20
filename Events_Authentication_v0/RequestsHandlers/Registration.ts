const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'
import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../Engine/index"
import User, { IUser } from '../Models/user';
import {IsRequestValid} from "../../Engine/ErrorHandler/ErrorHandler"

export function Registration(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("Registration",res,req);

    var requestValid = IsRequestValid(responseHelper,req,"email","password");
   
    if(!requestValid)
        return;

    //if registering as partner
    // if(req.body.userType === "Partner")
    // {
    //     requestValid = IsRequestValid(responseHelper,req,"email","password","userType","partnerKey");
   
    //     if(!requestValid)
    //         return;
    
    // }

    responseHelper.JsonRequest_Succeded()

    User.find({"email":req.body.email})
    .exec()
    .then(function(user:any){
        //if mail existed
        if(user.length >= 1){
            return responseHelper.HTTP_UnprocessableEntity(
                {email : "mail Existed"}
            );
        }
        
        //if password lower than 8 digit
        if(req.body.password.length < 8)
        {
            return responseHelper.HTTP_UnprocessableEntity(
                {password : "password length musth be longer than 8 characters"}
            );
        }



        //Encrypting input password
        bcrypt.hash(req.body.password,10,
            (err:any,hash:string)=>{
                if(err){return responseHelper.HTTP_UnprocessableEntity(err);}

                const userModel = new User({
                    _id: new mongoose.Types.ObjectId,
                    email: req.body.email,
                    password: hash,
                    userType: "User",
                    point: 0
                })
        
                userModel.save()
                .then(function(result:any){
                    responseHelper.HTTP_OK_JSONResponse({
                        "message": "registration success",
                        result
                    });
                })
                .catch(function(err:any){
                    responseHelper.HTTP_InternalServerError(err);
                })
            }
        );
    })
    .catch(function(err:any){responseHelper.HTTP_InternalServerError(err);})
 } 
