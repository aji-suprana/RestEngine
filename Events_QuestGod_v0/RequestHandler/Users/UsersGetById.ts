import mongoose, {Document} from 'mongoose';

import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import User, {IUser} from '../../../Events_Authentication_v0/Models/user';
import {ResponseHelper} from '../../../Engine/index';

export function UserGetById(req:Request, res:Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("UserGetById", res, req);

    responseHelper.JsonRequest_Succeded();

    User
    .findOne({ _id: req.params.userId })
    .exec()
    .then( function(result:any) {
        console.log(result);
        return responseHelper.HTTP_OK_DocResponse(result);
    })
    .catch(function(err:any) {
        console.log(err);
        return responseHelper.HTTP_InternalServerError(err);
    })
}