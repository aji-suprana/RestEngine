import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Channel from '../../Models/influencer-channel';
import {ResponseHelper} from '../../../Engine/index';

export function ChannelGet(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("ChannelGet", res, req);
    responseHelper.JsonRequest_Succeded();

    Influencer_Channel
        .find()
        .then(function(result:any) {
            return responseHelper.HTTP_OK_JSONResponse({
                message: "influencer product get",
                result
            })
        })
        .catch(function(err:any) {
            return responseHelper.HTTP_UnprocessableEntity(err);
        })
}