import express = require('express');

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";
import {ResponseHelper} from "../../Engine/index"

import {RequestGroup} from "../index";

import cors = require('cors');

export function IsRequestValid(responseHelper:ResponseHelper,req:Request,...requiredProperties:String[]) 
{
    var missingProperties:String[] = []

    requiredProperties.forEach(function(value:String,index:number){
        var reqBody = req.body;

        if(!reqBody.hasOwnProperty(value))
        {
            missingProperties.push(value);
        }
    })

    if(missingProperties.length == 0)
    {
        return true;
    }
    else
    {
        responseHelper.HTTP_UnprocessableEntity(
            {
                message : "invalid request body",
                details : "[" + missingProperties + "] is required!",
            }
        );
        return false;

    }
}

export class ErrorHandler extends RequestGroup{
    RegisterChildMethods(){}
    RegisterMiddlewares(){}
    RegisterRequestHandlers(){}

    RoutesHandler() {
        // this.expressApp.use(cors({
        //     origin: 'http://localhost:3000'
        // }));
        //Prevent CORS ERROR
        //Handling all Errors
        this.expressApp.use((req, res, next) => {
            let error:any;
            error = new Error('Not found');
            error.status = 404;
                
            next(error);
        })

        this.expressApp.use((error:any, req:Request, res:Response, next:NextFunction) => {        
             
            res.status(error.status || 500);
            res.json({
                error: {
                    message: error.message
                }
            });
        })

    }
}

