import * as jwt from 'jsonwebtoken';

import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import {ResponseHelper} from '../../../Engine/index';

export function TestAuth(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("TestAuth", res, req);

    responseHelper.JsonRequest_Succeded();

    try{
        var token = req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token,(String)(process.env.JWT_KEY));
        return responseHelper.HTTP_OK_JSONResponse({
            result: decoded
        })

    }

    catch (error){

    }
}