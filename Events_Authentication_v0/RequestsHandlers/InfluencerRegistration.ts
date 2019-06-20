const bcrypt = require('bcrypt')

import mongoose,{Document} from 'mongoose'
import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../Engine/index"
import {IsRequestValid} from "../../Engine/ErrorHandler/ErrorHandler"

import Influencer from '../Models/influencer';

export function InfluencerRegistration( req:Request, res:Response, next:NextFunction ) {
    const responseHelper = new ResponseHelper("InfluencerRegistration", res, req);
    // const requestValid = IsRequestValid(responseHelper, req, "email", "password", "userType");

    // if (!requestValid)
    //     return;

    responseHelper.JsonRequest_Succeded()

    // bcrypt.compare(req.body.password, process.env.INFLUENCER_KEY, function( err:Error, result:boolean) {
    //     var tempBool = CheckIfPasswordIsCorrect(err, result);
    //     if (tempBool) {
            Influencer.find({"email":req.body.email})
            .exec()
            .then(function(user:any) {
                if (user.length >= 1) {
                    return responseHelper.HTTP_UnprocessableEntity(
                        {email: "mail Existed"}
                    );
                }

                if (req.body.password.length < 8 ) {
                    return responseHelper.HTTP_UnprocessableEntity(
                        { password: "password length must be longer than 8 characters"}
                    );
                }

                bcrypt.hash(req.body.password, 10, (err:any, hash:string) => {
                    if (err) {
                        return responseHelper.HTTP_UnprocessableEntity(err);
                    }

                    const influencerModel = new Influencer({
                        _id: new mongoose.Types.ObjectId,
                        email: req.body.email,
                        password: hash,
                        userType: 'Influencer'
                    })

                    console.log(influencerModel);

                    influencerModel.save()
                    .then(function(result:Document) {
                        responseHelper.HTTP_OK_DocResponse(result);
                        console.log(result);
                    })

                    .catch(function(err:any) {
                        responseHelper.HTTP_InternalServerError(err);
                    })
                })
            })

            .catch( function(err:any) {
                responseHelper.HTTP_InternalServerError(err);
            })
    //     } else {
    //         return responseHelper.HTTP_Unauthorized("Auth key invalid!");
    //     }
    // })
}

function CheckIfPasswordIsCorrect(err:Error, result:boolean):boolean{
    if (err) {
        return false;
    }

    return result;
}