import mongoose, {Document} from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import Influencer_Product, {IInfluencer_Product} from '../../Models/influencer-product';

import {ResponseHelper} from '../../../Engine/index';

export function InfluencerProductGetById(req:Request, res:Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("ProductGetById", res, req);

    /**
     * Request
     * @params : ":productId"
     */

    Influencer_Product
        .find({_id: req.params.productId})
        .exec()
        .then(function(result:any) {
            return responseHelper.HTTP_OK_JSONResponse({
                'message': 'product get by id',
                result
            })
        })
        .catch(function(err:any) {
            return responseHelper.HTTP_InternalServerError(err);
        })
}
