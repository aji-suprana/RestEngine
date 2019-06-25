import mongoose, {Document} from 'mongoose';

import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Channel, {IInfluencer_Channel} from '../../Models/influencer-channel';

import {ResponseHelper} from '../../../Engine/index';



export function ChannelGetByName(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("ChannelGetByName", res,req);
    responseHelper.JsonRequest_Succeded();

    const channelNameToLowerCase = req.params.channelName.toLowerCase();
    const channelUrl = channelNameToLowerCase.replace(/\s/g, "-");

    Influencer_Channel
    .findOne({ channelUrl: channelUrl })
    .exec()
    .then(function(result:any) {
        console.log(result);
        return responseHelper.HTTP_OK_DocResponse(result);
    })
    .catch(function(err:any) {
        console.log(err);
        return responseHelper.HTTP_InternalServerError(err);
        
    })
}