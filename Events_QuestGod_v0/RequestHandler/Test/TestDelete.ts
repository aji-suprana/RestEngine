import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import { ResponseHelper } from "../../../Engine";

export function TestDelete(req:Request, res: Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("TestDelete", res, req);

    responseHelper.JsonRequest_Succeded();

    return responseHelper.HTTP_OK_JSONResponse({
        "message" : req.body
    })
}