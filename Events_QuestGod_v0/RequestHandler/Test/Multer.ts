import mongoose from 'mongoose';
import {Request} from 'express-serve-static-core';
import {Response} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';

import {ResponseHelper} from '../../../Engine/index';

// import multer from 'multer';
import Multer_Model, {IMulter_Model} from '../../Models/multer';
// const upload = multer({ dest: '/uploads/'})

export function Multer(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("MulterTest", res, req);
    responseHelper.JsonRequest_Succeded();

    Multer_Model
    .find({ "name" : req.body.name })
    .exec()
    .then( (result:any) => {
        if (result.length >= 1) {
            return responseHelper.HTTP_UnprocessableEntity({
                message: "name existed"
            })
        }

        const multerModel = new Multer_Model({
            _id: new mongoose.Types.ObjectId,
            name: req.body.name,
        })
    })

}