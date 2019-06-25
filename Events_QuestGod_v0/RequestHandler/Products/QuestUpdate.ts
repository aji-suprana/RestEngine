const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import Quest,{IQuest} from '../../Models/quest';
import {ResponseHelper} from "../../../Engine/index"


export function QuestUpdate(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("QuestUpdate",res,req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;

    // if(userType == "Partner" || userType == "Admin")
    // {
        // responseHelper.HTTP_OK_JSONResponse({message:"QuestUpdate"});
        const id = req.params.questId
        
        Quest.updateOne({_id: id}, {$set:req.body})
            .then(function(result:Document) {
                Quest.find({_id: id})
                    .exec()
                    .then(function(result:any){
                        return responseHelper.HTTP_OK_JSONResponse({
                            'message': 'quest updated',
                            result
                        });
                        // res.status(200).json(result);
                    })
            })
            .catch(function(err) {
                res.status(500).json(err);
            })
    // }else{
    //     return responseHelper.HTTP_Unauthorized("invalid access!Parner account is required");
    // }
 } 