import express from "express";
import {RequestGroup} from './BaseClass/RequestsGroup'
import {ErrorHandler} from './ErrorHandler/ErrorHandler'
import * as core from "express-serve-static-core";
const bodyParser = require('body-parser');

export class QG_Engine{
    _rg :Array<RequestGroup> = [];

    app:core.Application = express();
    errorHandler: ErrorHandler = new ErrorHandler("ErrorHandler",0);

    constructor()
    {
        console.log("initializing QG Engine...")
        this.app.use(bodyParser.urlencoded({extended:false}));
        this.app.use(bodyParser.json());
    }

    getRequestGroup(requestGroupName:string)
    {
        return this._rg.find(function(rg){
            return rg.requestGroupName == requestGroupName;
        })
    }


    RegisterRequestGroup(child:RequestGroup){
        this._rg.push(child);
    }

    Initialize()
    {
        this._InitializeModularRequestGroups();

        //Have to be at the end
        this.errorHandler.Initialize(this.app);
    }

    _InitializeModularRequestGroups()
    {
        let myApp = this.app;
        //console.log("RequestGroup count: "+this._rg.length)
        this._rg.forEach(function(value){
            value.Initialize(myApp);
        })
    }
 
}


