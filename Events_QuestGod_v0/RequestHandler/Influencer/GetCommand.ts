import {Request, Response, NextFunction} from 'express-serve-static-core';
import Transaction from '../../Models/transaction';
import Influencer_Product from '../../Models/influencer-product';
import {ResponseHelper} from '../../../Engine/index';

export function GetCommand(req:Request, res: Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("GetCommand", res, req);
    responseHelper.JsonRequest_Succeded();

    const transactionId = req.params.transactionId;

    Transaction
    .find({ _id: transactionId })
    .exec()
    .then( (transaction:any) => {

        const productId = transaction[0].productId;

        Influencer_Product
        .find({ _id: productId })
        .select('command')
        .exec()
        .then( (product:any) => {
            return responseHelper.HTTP_OK_JSONResponse({
                product
            })
        })
    })
}