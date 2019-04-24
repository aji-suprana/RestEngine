//const RequestGroup = require('../Utilities/RequestsGroup')
//const HTTPMethodType = require('../Utilities/HTTPMethodType').HTTPMethodType;

import {HTTPMethodType} from '../Engine/Utilities/HTTPMethodType'
import {RequestGroup} from'../Engine/BaseClass/RequestsGroup'

//Requests
import {Registration} from "./Registration"
import {Authenticate} from "./Authenticate"

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../Engine/Utilities/ResponseHelper"
import {checkAuth} from'../Events_Authentication/check-auth'

export class RG_Authentication extends RequestGroup
{
    private static instance:RG_Authentication;
    
    static getInstance()
    {
        if(!RG_Authentication.instance){
            RG_Authentication.instance = new RG_Authentication("authentication");
        }

        return RG_Authentication.instance;
    }

    RegisterChildMethods()
    {
        console.log("Registering Child Methods in " + this.requestGroupPath)
        //this.RegisterRGChildMethod(HTTPMethodType.post,"registration",Registration);
        //this.RegisterRGChildMethod(HTTPMethodType.post,"authenticate",Authenticate);
    }

    RequestHandler(req:Request,res:Response,next:NextFunction) : any
    {
        var responseHelper = new ResponseHelper(req.body.eventKey,res,req);

        if(req.body.eventKey == undefined){
            responseHelper.HTTP_UnprocessableEntity({message: "request.eventKey property not found!"});
        }

        const eventKey:string = req.body.eventKey;
        return  RG_Authentication.getInstance().eventHandler[eventKey](req,res,next);
    }

    RegisterRequestHandlers()
    {
        console.log("Registering Events in " + this.requestGroupPath)
        RG_Authentication.getInstance().RegisterRequestHandler('Authenticate',Authenticate);
        RG_Authentication.getInstance().RegisterRequestHandler('Registration',Registration);
    }

    RegisterMiddlewares(){}
}