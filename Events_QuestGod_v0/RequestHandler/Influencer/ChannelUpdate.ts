import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Channel, {IInfluencer_Channel} from '../../Models/influencer-channel';
import {ResponseHelper} from '../../../Engine/index';

export function ChannelUpdate( req: Request, res: Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("ChannelUpdate", res, req);

    const userType = req.body.userData.userType;
    // const userId = req.body.userData.userId;
    // const channelId = req.body.channelId;
    const influencerId = req.body.userData.influencerId;

    if (userType == "Influencer") {
        //update influencer product
        Influencer_Channel
            .updateOne({ _id: influencerId}, {$set: req.body} )
            .then(function(result:any) {
                Influencer_Channel
                    .findOne({ _id: influencerId })
                    .then(function(result:any) {
                        return responseHelper.HTTP_OK_JSONResponse({
                            message: "Product updated",
                            result
                        })
                    })
            })
            .catch(function(err:any) {
                return responseHelper.HTTP_InternalServerError(err);
            })
    } else {
        return responseHelper.HTTP_Unauthorized("Invalid access! influencer account is required");
    }

}