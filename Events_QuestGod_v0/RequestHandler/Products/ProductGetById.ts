import {Response} from 'express-serve-static-core';
import {Request} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';
import Product from '../../Models/product';

import {ResponseHelper} from '../../../Engine/index';

export function ProductGetById( req: Request, res: Response, next: NextFunction ) {
    const responseHelper = new ResponseHelper('GetProductById', res, req);
    responseHelper.JsonRequest_Succeded();

    const id = req.params.productId;

    Product.find({_id: id})
    .then(function(result:any) {
        console.log(result);
        responseHelper.HTTP_OK_JSONResponse({
            "message": "GetProductById",
            result,
        });
    })
    .catch(function(err:any) {
        console.log(err);
        responseHelper.HTTP_InternalServerError(err);
    })
}