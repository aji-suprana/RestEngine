import mongoose, {Document} from 'mongoose';

import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Channel, {IInfluencer_Channel} from '../../Models/influencer-channel';
import {ResponseHelper} from '../../../Engine/index';

export function ChannelFollowersGet(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("ChannelFollowersGet", res, req);
    responseHelper.JsonRequest_Succeded();

    const channelId = req.body.channelId;

    Influencer_Channel
    .findOne({ _id : channelId })
    .exec()
    .then(function(result:any) {
        console.log(result);
        return responseHelper.HTTP_OK_DocResponse(result.followers);
    })
    .catch(function(err:any){
        console.log(err);
        return responseHelper.HTTP_InternalServerError(err);
    })
}