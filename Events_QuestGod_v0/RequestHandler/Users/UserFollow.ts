import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Channel, {IInfluencer_Channel} from '../../Models/influencer-channel';
import User, {IUser} from '../../../Events_Authentication_v0/Models/user';
import {ResponseHelper} from '../../../Engine/index';

export function UserFollow(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("UserFollow", res, req);
    const userType = req.body.userData.userType;
    const channelId = req.body.channelId;
    const userId = req.body.userData.userId;

    if (userType == 'User') {
        Influencer_Channel
            .findOne({ _id: channelId})
            .exec()
            .then( function(result:any) {

                //save to channel followers
                var influencerChannelFound:IInfluencer_Channel;
                influencerChannelFound = result;

                influencerChannelFound.followers.push(userId);
                influencerChannelFound.save();

                User
                    .findOne({ _id: userId })
                    .exec()
                    .then(function(result:any) {
                        //save to user follow
                        var userFound:IUser;
                        userFound = result;
                        userFound.follow.push(channelId);
                        userFound.save();

                        return responseHelper.HTTP_OK_JSONResponse({
                            message: "success"
                        })
                    })

            })
            .catch( function(err:any) {
                console.log(err);
            })
    } else {
        return responseHelper.HTTP_Unauthorized("User account required");
    }
}