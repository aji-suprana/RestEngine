
import * as core from "express-serve-static-core";
import {HTTPMethodType}  from "../Utilities/HTTPMethodType"
import * as expressTS from 'express';
const router = expressTS.Router();
const express = require('express');


import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";


export interface RequestGroupHandler {
    [key: string]: core.RequestHandler
}

class RequestGroup{
    
    expressApp:expressTS.Application = express();
    requestGroupName:string = 'null';
    requestGroupPath:string = 'null';
    isInitialized:boolean = false;
    middlewares:core.RequestHandler[] = [];
    eventHandler:RequestGroupHandler = { }

    constructor(_requestGroupName:string,_requestGroupVersion:number){
        this.requestGroupName =_requestGroupName;
        this.requestGroupPath = "/restapi_"+_requestGroupVersion.toString()+"/"+ _requestGroupName;
        //QG_Engine.RegisterRequestGroup(this);
    }

    Initialize(expressApp: expressTS.Application)
    {
        if(this.isInitialized === true){return}
        this.isInitialized = true;
        console.log("");
        console.log("INITIALIZING: RequestGroup["+this.requestGroupName+"]  .....")
        this.expressApp = expressApp;
        this.RegisterChildMethods();
        //this.RegisterMiddlewares();
        //this.RegisterRequestHandlers();

        //assign requestGroupPath to routers & handlers
        this.RoutesHandler();
    }


    static getInstance()
    {
        throw "RequestGroup Classes have to implement getInstance method and instance variable for singleton";
    }



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Registering Middleware for this group
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    RegisterMiddleware(handler:core.RequestHandler)
    {
        this.middlewares.push(handler);
    }

    RegisterMiddlewares()
    {
        throw "RequestGroup Classes have to implement RegisterMiddlewares() method even if its empty";
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Handling child routes & generic request handler with "@class" property with no path
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    RequestHandler(req:Request,res:Response,next:NextFunction)
    {
        throw "RequestGroup Classes have to implement RequestHandler() method even if its empty";
    }

    RoutesHandler()
    {
        this.expressApp.use(this.requestGroupPath,router);

        this.expressApp.post(this.requestGroupPath,this.middlewares,this.RequestHandler);
        this.expressApp.post(this.requestGroupPath,this.middlewares,this.RequestHandler);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Registering Request handler with no child paths
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    RegisterRequestHandlers()
    {
        throw "RequestGroup Classes have to implement RegisterRequestHandlers() method even if its empty";
    }

    RegisterRequestHandler(key:string,handler:core.RequestHandler)
    {
        console.log("registering");
        this.eventHandler[key] = handler;
        console.log(this.eventHandler[key]);
        //Object.entries(this.requestHandlers).push([key,handler]);
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Registering Child Method in child class, helper function to register child method
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    RegisterChildMethods()
    {
        throw "RequestGroup Classes have to implement RegisterHTTPMethods() method even if its empty";
    }

    RegisterRGChildMethod(MethodType:HTTPMethodType,routerName:string,...requestCB:core.RequestHandler[])
    {
        var path = '/'+routerName;
        var methodTypeName = HTTPMethodType[MethodType];
        switch(MethodType)
        {
            case HTTPMethodType.copy: router.copy(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.delete: router.delete(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.get: router.get(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.head: router.head(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.lock: router.lock(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.options: router.options(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.patch: router.patch(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.post: router.post(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.propfind: router.propfind(path,requestCB);this.DebugRegisteredHTTPMethod(methodTypeName,path); break;
            case HTTPMethodType.purge: router.purge(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.put: router.put(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            case HTTPMethodType.unlock: router.unlock(path,requestCB); this.DebugRegisteredHTTPMethod(methodTypeName,path);break;
            default: console.log("HttpMethod does not exist");
        }
    }

    DebugRegisteredHTTPMethod(methodName:string,path:string){
        console.log("registered httpmethod:"+methodName+" ,at path:"+this.requestGroupPath+path);
    }

}

export {RequestGroup}