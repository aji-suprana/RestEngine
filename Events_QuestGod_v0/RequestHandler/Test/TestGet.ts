import mongoose from 'mongoose';

import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import {ResponseHelper} from '../../../Engine/index';

export function TestGet(req:Request, res:Response, next:NextFunction){
    
    const responseHelper = new ResponseHelper("TestGet", res, req);
    return responseHelper.HTTP_OK_JSONResponse({
        message: req.body
    })
}