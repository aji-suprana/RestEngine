//const RequestGroup = require('../Utilities/RequestsGroup')
//const HTTPMethodType = require('../Utilities/HTTPMethodType').HTTPMethodType;

import {HTTPMethodType} from '../Engine/index'
import {RequestGroup} from'../Engine/BaseClass/RequestsGroup'

import {checkAuth} from '../Events_Authentication_v0/Middleware/check-auth'
//Requests

//channel
import {ChannelCreate} from "./RequestHandler/Influencer/ChannelCreate"
import {ChannelUpdate} from "./RequestHandler/Influencer/ChannelUpdate"
import {ChannelGet} from "./RequestHandler/Influencer/ChannelGet"
import {ChannelGetById} from "./RequestHandler/Influencer/ChannelGetById"
import {ChannelFollowersGet} from "./RequestHandler/Influencer/ChannelFollowersGet"
import {ChannelGetByName} from "./RequestHandler/Influencer/ChannelGetByName"

//product
import {InfluencerProductCreate} from "./RequestHandler/Influencer/ProductCreate"
import {InfluencerProductDelete} from "./RequestHandler/Influencer/ProductDelete"
import {InfluencerProductUpdate} from "./RequestHandler/Influencer/ProductUpdate"
import {InfluencerProductGet} from "./RequestHandler/Influencer/ProductGet"
import {InfluencerProductGetById} from './RequestHandler/Influencer/ProductGetById'

//other
import {SendPointToUser} from './RequestHandler/Influencer/SendPointToUser';

//import {Authenticate} from "./Authenticate"

export class RG_Influencers extends RequestGroup
{
    private static instance:RG_Influencers;

    getInstance()
    {
        if(!RG_Influencers.instance){
            RG_Influencers.instance = new RG_Influencers("influencers",0);
        }

        return RG_Influencers.instance;
    }

    RegisterChildMethods()
    {
        console.log("Registering Child Methods in " + this.requestGroupPath)
        
        //channel
        this.RegisterRGChildMethod(HTTPMethodType.post, "influencers/channel", checkAuth, ChannelCreate);
        this.RegisterRGChildMethod(HTTPMethodType.patch, "influencers/channel", checkAuth, ChannelUpdate);
        this.RegisterRGChildMethod(HTTPMethodType.get, "influencers/channel", checkAuth, ChannelGet);
        this.RegisterRGChildMethod(HTTPMethodType.get, "influencers/channel/id/:channelId", checkAuth, ChannelGetById);
        this.RegisterRGChildMethod(HTTPMethodType.get, "influencers/channel/followers", checkAuth, ChannelFollowersGet);
        this.RegisterRGChildMethod(HTTPMethodType.get, "influencers/channel/name/:channelName", checkAuth, ChannelGetByName);


        //product
        this.RegisterRGChildMethod(HTTPMethodType.get, "influencers/channel/product", checkAuth, InfluencerProductGet);
        this.RegisterRGChildMethod(HTTPMethodType.get, "influencers/channel/product/id/:productId", checkAuth, InfluencerProductGetById);
        this.RegisterRGChildMethod(HTTPMethodType.post, "influencers/channel/product", checkAuth, InfluencerProductCreate);
        this.RegisterRGChildMethod(HTTPMethodType.delete, "influencers/channel/product", checkAuth, InfluencerProductDelete);
        this.RegisterRGChildMethod(HTTPMethodType.patch, "influencers/channel/product", checkAuth, InfluencerProductUpdate);

        //other
        this.RegisterRGChildMethod(HTTPMethodType.patch, "influencers/sendpoint", checkAuth, SendPointToUser);

    }

    RegisterMiddlewares(){}
    RegisterRequestHandlers(){}
}