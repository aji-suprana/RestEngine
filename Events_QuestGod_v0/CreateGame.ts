const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'
import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../Engine_v0/index"
import GameProduct, { IGameProduct } from './Models/gameproduct';

export function CreateGame(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("CreateGame",res,req);
    responseHelper.JsonRequest_Succeded();

    //const userType = req.body.userData.userType;

    GameProduct.find({"name":req.body.name})
    .exec()
    .then(function(user:any){
        //if mail existed
        if(user.length >= 1){
            return responseHelper.HTTP_UnprocessableEntity(
                {email : "game Existed"}
            );
        }

        // const gameModel = new GameProduct({
        //     _id: new mongoose.Types.ObjectId,
        //     name: req.body.name,

        // })

        // gameModel.save()
        // .then(function(result:Document){
        //     responseHelper.HTTP_OK_DocResponse(result);
        // })
        // .catch(function(err:any){
        //     responseHelper.HTTP_InternalServerError(err);
        // })
        responseHelper.HTTP_OK_JSONResponse({});
    })
 } 
