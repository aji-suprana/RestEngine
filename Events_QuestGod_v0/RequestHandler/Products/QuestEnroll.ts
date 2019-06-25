const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../../Engine/index"


export function QuestEnroll(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("QuestEnrolled",res,req);
    responseHelper.JsonRequest_Succeded();

    // const userType = req.body.userData.userType;

    // if(userType == "User")
    // {
        // responseHelper.HTTP_OK_JSONResponse({message:"QuestEnroll"});
    // }else{
        // return responseHelper.HTTP_Unauthorized("invalid access!Parner account is required");
    // }
    

 } 