import mongoose, {Document} from "mongoose";
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Channel, {IInfluencer_Channel} from '../../Models/influencer-channel';

import {ResponseHelper} from '../../../Engine/index';

export function ChannelGetById(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("ChannelGetById", res, req);
    responseHelper.JsonRequest_Succeded();

    const channelId = req.params.channelId

    Influencer_Channel
        .findOne({ _id: channelId})
        .then(function(result:any) {
            return responseHelper.HTTP_OK_JSONResponse({
                message: "Influencer product get by id",
                result
            })
        })
        .catch(function(err:any) {
            return responseHelper.HTTP_UnprocessableEntity(err);
        })
}