import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer, {IInfluencer} from '../../../Events_Authentication_v0/Models/influencer';
import {ResponseHelper} from '../../../Engine/index';

export function InfluencerGet(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("InfluencerGet", res, req);
    responseHelper.JsonRequest_Succeded();

    Influencer
    .find()
    .exec()
    .then(function(result:any) {
        console.log(result);
        return responseHelper.HTTP_OK_JSONResponse(result);
    })
    .catch(function(err:any) {
        console.log(err);
        return responseHelper.HTTP_InternalServerError(err);
    })
}