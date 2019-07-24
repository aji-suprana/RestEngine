//const RequestGroup = require('../Utilities/RequestsGroup')
//const HTTPMethodType = require('../Utilities/HTTPMethodType').HTTPMethodType;

import {HTTPMethodType} from '../Engine/index'
import {RequestGroup} from'../Engine/BaseClass/RequestsGroup'

import {checkAuth} from '../Events_Authentication_v0/Middleware/check-auth'
//Requests

import {UserGet} from "./RequestHandler/Users/UserGet"
import {UserGetById} from "./RequestHandler/Users/UsersGetById"
import {UserUpdate} from "./RequestHandler/Users/UserUpdate"
import {UserFollow} from './RequestHandler/Users/UserFollow'
import {UserSpentPoint} from './RequestHandler/Users/UserSpentPoint'
import {UserUnfollow} from './RequestHandler/Users/UserUnfollow'

// import {Test} from './RequestHandler/Users/Test';

//import {Authenticate} from "./Authenticate"

export class RG_Users extends RequestGroup
{
    private static instance:RG_Users;

    getInstance()
    {
        if(!RG_Users.instance){
            RG_Users.instance = new RG_Users("users",0);
        }

        return RG_Users.instance;
    }

    RegisterChildMethods()
    {
        console.log("Registering Child Methods in " + this.requestGroupPath)

        //users
        console.log('users request group');
        this.RegisterRGChildMethod(HTTPMethodType.get,"users",checkAuth, UserGet);
        this.RegisterRGChildMethod(HTTPMethodType.get, "users/id/:userId", checkAuth, UserGetById);
        this.RegisterRGChildMethod(HTTPMethodType.patch, "users", checkAuth, UserUpdate);
        this.RegisterRGChildMethod(HTTPMethodType.put, "users", checkAuth, UserUpdate);
        this.RegisterRGChildMethod(HTTPMethodType.post, "users/follow", checkAuth, UserFollow);
        this.RegisterRGChildMethod(HTTPMethodType.post, "users/unfollow", checkAuth, UserUnfollow);
        this.RegisterRGChildMethod(HTTPMethodType.patch, "users/spentpoint", checkAuth, UserSpentPoint);
        this.RegisterRGChildMethod(HTTPMethodType.put, "users/spentpoint", checkAuth, UserSpentPoint);

        // this.RegisterRGChildMethod(HTTPMethodType.get, "test", Test);
    }

    RegisterMiddlewares(){}
    RegisterRequestHandlers(){}
}