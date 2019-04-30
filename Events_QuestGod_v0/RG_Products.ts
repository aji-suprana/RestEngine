//const RequestGroup = require('../Utilities/RequestsGroup')
//const HTTPMethodType = require('../Utilities/HTTPMethodType').HTTPMethodType;

import {HTTPMethodType} from '../Engine/index'
import {RequestGroup} from'../Engine/BaseClass/RequestsGroup'

import {checkAuth} from '../Events_Authentication_v0/Middleware/check-auth'
//Requests
import {CreateProduct} from "./RequestHandler/CreateProduct"
import {DeleteProduct} from "./RequestHandler/DeleteProduct"

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
        this.RegisterRGChildMethod(HTTPMethodType.post,"",checkAuth,CreateProduct);
        this.RegisterRGChildMethod(HTTPMethodType.delete,':productId',checkAuth,DeleteProduct);
    }

    RegisterMiddlewares(){}
    RegisterRequestHandlers(){}
}