const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";
import Quest, {IQuest} from '../../Models/quest';
import Product from '../../Models/product';

import {ResponseHelper} from "../../../Engine/index"


export function QuestGet(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("QuestGet",res,req);
    responseHelper.JsonRequest_Succeded();

    // userType undefined
    const userType = req.body.userData.userType;
    const id = req.body.questId;

    if(userType == "User" || userType == "Partner")
    {

        if (id) {
            // responseHelper.HTTP_OK_JSONResponse({message:"QuestGetById"});
            Quest
                .find({_id: id})
                .then(function(result:any) {
                    console.log(result);
                    // return res.status(200).json(result);
                    responseHelper.HTTP_OK_JSONResponse(result);
                })
                .catch(err => {
                    console.log(err);
                   return res.status(500).json(err);
                })
        } else {
            // responseHelper.HTTP_OK_JSONResponse({message:"QuestGet"});
            Quest.find()
                .exec()
                .then(function(result:any) {
                    responseHelper.HTTP_OK_JSONResponse({
                        "message": "quest get",
                        result
                    });
                })
                .catch(function(err:any) {
                    console.log(err);
                    responseHelper.HTTP_InternalServerError(err);
                })
        }
    }else{
        return responseHelper.HTTP_Unauthorized("invalid access!Parner account is required");
    }
 }