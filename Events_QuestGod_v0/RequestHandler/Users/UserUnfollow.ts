import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import User, {IUser} from '../../../Events_Authentication_v0/Models/user';
import Influencer_Channel, {IInfluencer_Channel} from '../../Models/influencer-channel';
import {ResponseHelper} from '../../../Engine/index';

export function UserUnfollow(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("UserUnfollow", res, req);
    responseHelper.JsonRequest_Succeded();

    /**
     * Request
     * @body : ":channelId"
     */

    const channelId = req.body.channelId;
    const userId = req.body.userData.userId;

    User
    .findOne({ "_id": userId })
    .exec()
    .then(function(value:any) {
        var userContainer:IUser;

        if (value == null) {
            return responseHelper.HTTP_InternalServerError({ message: "invalid user" })
        } else {
            userContainer = value;
        }

        var follow = userContainer.follow;
        for (var i = 0; i < userContainer.follow.length; i++ ) {
            if (userContainer.follow[i].toString() === channelId.toString() ) {
                userContainer.follow.splice(i, 1);
            }
        }

        userContainer.follow = follow;
        userContainer.save()
        
        //remove user id from influencer channel subscribe list
        Influencer_Channel
        .findOne({ "_id": channelId })
        .exec()
        .then(function(value:any) {
            var channelContainer:IInfluencer_Channel;

            if(value == null) {
                return responseHelper.HTTP_InternalServerError({ message: "invalid user" })
            } else {
                channelContainer = value;
            }

            var followers = channelContainer.followers;
            for (var i = 0; i < channelContainer.followers.length; i++) {
                if (channelContainer.followers[i].toString() === userId.toString() ) {
                    channelContainer.followers.splice(i, 1);
                }
            }

            channelContainer.followers = followers;
            channelContainer.save();

            return responseHelper.HTTP_OK_JSONResponse({ "message" : "success" })
        })


    })
    .catch(function(err:any) {
        responseHelper.HTTP_InternalServerError(err);
    })
}