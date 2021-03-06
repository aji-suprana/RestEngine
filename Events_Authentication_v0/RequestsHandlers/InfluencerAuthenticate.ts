const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../Engine/index"
import {IsRequestValid} from "../../Engine/ErrorHandler/ErrorHandler"

import Influencer, { IInfluencer } from '../Models/influencer';

import * as jwt from 'jsonwebtoken'
import user from '../Models/user';

export function InfluencerAuthenticate(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("Authenticate", res, req);
    const requestValid = IsRequestValid(responseHelper,req,"email","password");
   
    if(!requestValid)
        return;

    responseHelper.JsonRequest_Succeded()

    Influencer.find({email: req.body.email})
    .exec()
    .then(function(influencer:IInfluencer[]) {
        if (!UserFound(influencer)) {
            return responseHelper.HTTP_Unauthorized("Authentication failed!");
        }

        bcrypt.compare(req.body.password, influencer[0].password, function(err:Error, result:boolean) {
            var tempBool = CheckIfPasswordIsCorrect(err, result);

            if(tempBool){
                const jwtToken = jwt.sign({
                    email: influencer[0].email,
                    influencerId: influencer[0]._id,
                    influencerDisplayName : influencer[0].displayName,
                    userType: influencer[0].userType
                },
                (String)(process.env.JWT_KEY),
                {
                    expiresIn: "100d"
                })
                
                return responseHelper.HTTP_OK_JSONResponse({
                    success: "Authentication Successfull!",
                    influencerId: influencer[0]._id,
                    influencerDisplayName: influencer[0].displayName,
                    token : jwtToken
                });
            }else{
                return responseHelper.HTTP_Unauthorized("Authentication failed!");
            }
        })
    })

    .catch(function(err) {
        return responseHelper.HTTP_InternalServerError(err);
    })
}

function UserFound(influencer:IInfluencer[]) : boolean{
    if(influencer.length >= 1) {
        return true;
    } else {
        return false;
    }
}

function CheckIfPasswordIsCorrect(err:Error, result:boolean):boolean{
    if(err) {
        return false;
    }

    return result;
}