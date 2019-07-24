//const RequestGroup = require('../Utilities/RequestsGroup')
//const HTTPMethodType = require('../Utilities/HTTPMethodType').HTTPMethodType;

import {HTTPMethodType} from '../Engine/index'
import {RequestGroup} from'../Engine/BaseClass/RequestsGroup'

import {checkAuth} from '../Events_Authentication_v0/Middleware/check-auth'
//Requests

import {TestGet} from './RequestHandler/Test/TestGet';
import {TCP} from './RequestHandler/Test/TCP';
import {TestPost} from './RequestHandler/Test/TestPost';
import {TestUpdate} from './RequestHandler/Test/TestUpdate';
import {TestDelete} from './RequestHandler/Test/TestDelete';

import {TestAuth} from './RequestHandler/Test/TestAuth';

// import {Multer} from './RequestHandler/Test/Multer';

//import {Authenticate} from "./Authenticate"

// import multer from 'multer';
// const upload = multer({dest: '/uploads/'})

export class RG_Test extends RequestGroup
{
    private static instance:RG_Test;

    getInstance()
    {
        if(!RG_Test.instance){
            RG_Test.instance = new RG_Test("test",0);
        }

        return RG_Test.instance;
    }

    RegisterChildMethods()
    {
        console.log("Registering Child Methods in " + this.requestGroupPath)

        //users
        this.RegisterRGChildMethod(HTTPMethodType.get, "test", TestGet);
        this.RegisterRGChildMethod(HTTPMethodType.get, "test/tcp", TCP);
        this.RegisterRGChildMethod(HTTPMethodType.post, "test", TestPost);
        this.RegisterRGChildMethod(HTTPMethodType.delete, "test", TestDelete);
        this.RegisterRGChildMethod(HTTPMethodType.patch, "test", TestUpdate);
        this.RegisterRGChildMethod(HTTPMethodType.post, "test/auth", checkAuth, TestAuth);
        // this.RegisterRGChildMethod(HTTPMethodType.post, "test/multer", checkAuth, Multer, upload.single('productImage'));
       
    }

    RegisterMiddlewares(){}
    RegisterRequestHandlers(){}
}