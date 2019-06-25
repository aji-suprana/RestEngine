import mongoose, {Document} from 'mongoose';

import {Response} from 'express-serve-static-core';
import {Request} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import {ResponseHelper} from '../../../Engine/index';
import Influencer_Channel, {IInfluencer_Channel} from '../../Models/influencer-channel';
import InfluencerProduct, {IInfluencer_Product} from '../../Models/influencer-product';

export function ChannelCreate(req: Request, res:Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("CreateChannel", res, req);
    responseHelper.JsonRequest_Succeded();

    /**
     * Note
     * get user type using influencer id
     */
    const userType = req.body.userData.userType;

    if (userType == "Influencer") {
        const object:Object = {}

        const channelName = req.body.channelName;
        
        //generate channel url
        const channelNameToLower = channelName.toLowerCase();
        const channelUrl = channelNameToLower.replace(/\s/g, "-");

        Influencer_Channel
            .find({ "_id": req.body.userData.influencerId })
            .exec()
            .then( (channel:any) => {
                if(channel.length >= 1) {
                    return responseHelper.HTTP_UnprocessableEntity(
                        { message : "channel Existed" }
                    );
                }

                const channelModel = new Influencer_Channel({
                    _id: req.body.userData.influencerId,
                    channelName: channelName,
                    channelUrl: channelUrl
                });

                console.log('models');
                console.log(channelModel);

                channelModel.save()
                .then(function(result: any) {
                    // SaveToContainer( InfluencerChannel._id, req, responseHelper);
                    responseHelper.HTTP_OK_JSONResponse({
                        "message": "channel created",
                        result
                    });
                })
                .catch(function(err:any) {
                    responseHelper.HTTP_InternalServerError(err);
                })
            })
    } else {
        return responseHelper.HTTP_Unauthorized("invalid access! Influencer account is required");
    }
}

// function SaveToContainer(channelId:mongoose.Schema.Types.ObjectId, req: Request, responseHelper: ResponseHelper)
// {
//     InfluencerProduct
//         .findOne({"_id": req.body.userData.influencerId})
//         .exec()
//         .then((value:any) => {
//             var influencerChannelFound:IInfluencer_Channel;
//             if ( value === null ) {
//                 const influencer_ChannelModel = 
//             }
//         })
// }