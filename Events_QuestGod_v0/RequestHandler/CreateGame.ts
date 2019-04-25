const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../Engine/index"
import GameProduct,{IGameProduct} from '../Models/gameproduct';

export function CreateGame(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("CreateGame",res,req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;

    if(userType == "Partner" || userType == "Admin")
    {
        GameProduct.find({"name":req.body.name})
        .exec()
        .then(function(game:any){
            //if mail existed
            if(game.length >= 1){
                return responseHelper.HTTP_UnprocessableEntity(
                    {message : "game Existed"}
                );
            }
    
            const gameModel = new GameProduct({
                _id: new mongoose.Types.ObjectId,
                name: req.body.name,
    
            })
    
            gameModel.save()
            .then(function(result:Document){
                responseHelper.HTTP_OK_DocResponse(result);
            })
            .catch(function(err:any){
                responseHelper.HTTP_InternalServerError(err);
            })

        })
    }else{
        return responseHelper.HTTP_Unauthorized("invalid access!");
    }
 } 
