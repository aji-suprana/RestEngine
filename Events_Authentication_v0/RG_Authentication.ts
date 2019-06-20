//const RequestGroup = require('../Utilities/RequestsGroup')
//const HTTPMethodType = require('../Utilities/HTTPMethodType').HTTPMethodType;

import {HTTPMethodType} from '../Engine/Utilities/HTTPMethodType'
import {RequestGroup} from'../Engine/BaseClass/RequestsGroup'

//Requests
import {Registration} from "./RequestsHandlers/Registration"
import {AdminRegistration} from "./RequestsHandlers/AdminRegistration"
import {Authenticate} from "./RequestsHandlers/Authenticate"
import {AdminAuthenticate} from "./RequestsHandlers/AdminAuthenticate"

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../Engine/Utilities/ResponseHelper"
import { InfluencerRegistration } from './RequestsHandlers/InfluencerRegistration';
import { InfluencerAuthenticate } from './RequestsHandlers/InfluencerAuthenticate';

export class RG_Authentication extends RequestGroup
{
    private static instance:RG_Authentication;
    
    static getInstance()
    {
        if(!RG_Authentication.instance){
            RG_Authentication.instance = new RG_Authentication("auth",0);
        }

        return RG_Authentication.instance;
    }

    RegisterChildMethods()
    {
        console.log("REGISTERING CHILD METHOD IN " + this.requestGroupPath)
        this.RegisterRGChildMethod(HTTPMethodType.post,"authentication",Authenticate);
        this.RegisterRGChildMethod(HTTPMethodType.post,"registration",Registration);
        this.RegisterRGChildMethod(HTTPMethodType.post,"adminregistration",AdminRegistration);
        this.RegisterRGChildMethod(HTTPMethodType.post,"adminauthentication",AdminAuthenticate);
        this.RegisterRGChildMethod(HTTPMethodType.post,"influencerauthentication", InfluencerAuthenticate);
        this.RegisterRGChildMethod(HTTPMethodType.post,"influencerregistration", InfluencerRegistration);

    }
    
    RegisterRequestHandlers()
    {
        console.log("REGISTERING EVENTS IN " + this.requestGroupPath)
        RG_Authentication.getInstance().RegisterRequestHandler('Authentication',Authenticate);
        RG_Authentication.getInstance().RegisterRequestHandler('Registration',Registration);
        RG_Authentication.getInstance().RegisterRequestHandler('AdminRegistration',AdminRegistration);
        RG_Authentication.getInstance().RegisterRequestHandler('AdminAuthentication',AdminAuthenticate);
        RG_Authentication.getInstance().RegisterRequestHandler('InfluencerAuthentication',InfluencerAuthenticate);
        RG_Authentication.getInstance().RegisterRequestHandler('InfluencerRegistration',InfluencerRegistration);
    }

    RequestHandler(req:Request,res:Response,next:NextFunction) : any
    {
        var responseHelper = new ResponseHelper(req.body.eventKey,res,req);
        const eventKey:string = req.body.eventKey;

        if(Object.keys(req.body).length == 0){
            throw "post request has no body"
        }
        
        if(req.body.eventKey == undefined){
            return responseHelper.HTTP_UnprocessableEntity({message: "request.eventKey property not found!"});
        }

        if(typeof( RG_Authentication.getInstance().eventHandler[eventKey]) === "undefined"){
            return responseHelper.HTTP_UnprocessableEntity({message: "invalid request.eventKey!"});
        }

        return  RG_Authentication.getInstance().eventHandler[eventKey](req,res,next);
    }


    RegisterMiddlewares(){}
}