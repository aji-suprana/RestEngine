//const RequestGroup = require('../Utilities/RequestsGroup')
//const HTTPMethodType = require('../Utilities/HTTPMethodType').HTTPMethodType;

import {HTTPMethodType} from '../Engine/index'
import {RequestGroup} from'../Engine/BaseClass/RequestsGroup'

import {checkAuth} from '../Events_Authentication_v0/Middleware/check-auth'
//Requests
import {ProductGet} from "./RequestHandler/Products/ProductGet"
import {ProductGetById} from "./RequestHandler/Products/ProductGetById"
import {ProductCreate} from "./RequestHandler/Products/ProductCreate"
import {ProductDelete} from "./RequestHandler/Products/ProductDelete"
import {ProductUpdate} from "./RequestHandler/Products/ProductUpdate"

import {QuestCreate} from "./RequestHandler/Products/QuestCreate"
import {QuestDelete} from "./RequestHandler/Products/QuestDelete"
import {QuestEnroll} from "./RequestHandler/Products/QuestEnroll"
import {QuestGet} from "./RequestHandler/Products/QuestGet"
import {QuestGetById} from "./RequestHandler/Products/QuestGetById"
import {QuestUpdate} from "./RequestHandler/Products/QuestUpdate"
import {QuestComplete} from "./RequestHandler/Products/QuestComplete"


//import {Authenticate} from "./Authenticate"

export class RG_Products extends RequestGroup
{
    private static instance:RG_Products;

    getInstance()
    {
        if(!RG_Products.instance){
            RG_Products.instance = new RG_Products("products",0);
        }

        return RG_Products.instance;
    }

    RegisterChildMethods()
    {
        console.log("Registering Child Methods in " + this.requestGroupPath)
        //products
        this.RegisterRGChildMethod(HTTPMethodType.get,"", checkAuth, ProductGet);
        this.RegisterRGChildMethod(HTTPMethodType.get, "id/:productId", checkAuth, ProductGetById);
        this.RegisterRGChildMethod(HTTPMethodType.post,"",checkAuth,ProductCreate);
        this.RegisterRGChildMethod(HTTPMethodType.delete,'',checkAuth,ProductDelete);
        this.RegisterRGChildMethod(HTTPMethodType.patch, "", checkAuth, ProductUpdate);
        this.RegisterRGChildMethod(HTTPMethodType.put,"", checkAuth, ProductUpdate);

        //quests
        this.RegisterRGChildMethod(HTTPMethodType.post,"quest",checkAuth,QuestCreate);
        this.RegisterRGChildMethod(HTTPMethodType.post,"quest/enroll",checkAuth,QuestEnroll);
        this.RegisterRGChildMethod(HTTPMethodType.get,"quest", checkAuth, QuestGet);
        this.RegisterRGChildMethod(HTTPMethodType.get,"quest/id/:questId", checkAuth, QuestGetById);
        this.RegisterRGChildMethod(HTTPMethodType.patch,"quest",checkAuth,QuestUpdate);
        this.RegisterRGChildMethod(HTTPMethodType.delete,"quest",checkAuth,QuestDelete);
        this.RegisterRGChildMethod(HTTPMethodType.post,"quest/complete",checkAuth, QuestComplete);

    }

    RegisterMiddlewares(){}
    RegisterRequestHandlers(){}
}