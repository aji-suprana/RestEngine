import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";
import * as core from "express-serve-static-core";

export class RequestClass
{
    requestHandlers:core.RequestHandler[] = [];

    RegisterRequestsHandler(reqHandler:core.RequestHandler)
    {
        this.requestHandlers.push(reqHandler);
    }

    RunRequest(req:Request, res:Response, next:NextFunction)
    {

        throw "RequestGroup Classes have to implement getInstance method and instance variable for singleton";
    }
}