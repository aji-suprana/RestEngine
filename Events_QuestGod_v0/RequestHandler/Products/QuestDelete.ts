const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";
import Quest,{IQuest} from '../../Models/quest';

import {ResponseHelper} from "../../../Engine/index"


export function QuestDelete(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("QuestDelete",res,req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;

    if(userType == "Partner" || userType == "Admin")
    {
        const id = req.body.questId
        // responseHelper.HTTP_OK_JSONResponse({message:"QuestDelete"});
        Quest.deleteOne({ _id: id })
            .then(function(result:any) {
                return responseHelper.HTTP_OK_JSONResponse({
                    message: 'successfully removed',
                    result
                })
            })
    }else{
        return responseHelper.HTTP_Unauthorized("invalid access! Partner account is required");
    }
 }  