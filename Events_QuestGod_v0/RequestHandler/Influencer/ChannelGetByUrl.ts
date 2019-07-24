import mongoose, {Document} from 'mongoose';

import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Channel, {IInfluencer_Channel} from '../../Models/influencer-channel';

import {ResponseHelper} from '../../../Engine/index';



export function ChannelGetByUrl(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("ChannelGetByUrl", res,req);
    responseHelper.JsonRequest_Succeded();

    /**
     * Request
     * @params : "channelUrl"
     */
    const channelUrl = req.params.channelUrl;

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