import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import User, {IUser} from '../../../Events_Authentication_v0/Models/user';
import {ResponseHelper} from '../../../Engine/index';

export function SendPointToUser(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("SendPointToUser", res, req);
    responseHelper.JsonRequest_Succeded();

    const userType = req.body.userData.userType;
    const userId = req.body.userId

    if (userType == "Influencer") {
        User
        .findOne({ _id: userId })
        .then(function(result:any) {
            console.log('find user');
            console.log(result);
            console.log(result.point);
            console.log(userPoint);
            var userPoint = result.point + parseInt(req.body.point);

            //update user point
            User
            .updateOne({ _id: userId }, {$set: {"point" : userPoint } } )
            .then(function(result:Document) {
                console.log('update user point');
                console.log(result);
                //show updated user point
                User
                .find({ _id: userId })
                .then(function(result:any) {
                    console.log('show updated point');
                    console.log(result);
                    return responseHelper.HTTP_OK_JSONResponse({
                        "message" : "point added to user",
                        result
                    })
                })
            })

            .catch(function(err) {
                console.log(err);
                return responseHelper.HTTP_InternalServerError(err);
            })
        })

    } else {
        return responseHelper.HTTP_InternalServerError("invalid access! influencer account required");
    }
}