import mongoose from 'mongoose';
import {Request, Response, NextFunction} from 'express-serve-static-core';

import Test, {ITest} from '../../Models/test';

import {ResponseHelper} from '../../../Engine/index';

export function TestAsync(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("TestAsync", res, req);

    console.log('test asynchronous executed');
    Test
    
    .find()
    .exec()
    .then( (result) => {
        //if database empty
        let testModel = new Test({
            _id: new mongoose.Types.ObjectId,
            status: "0"
        })

        if (result.length == 0) {
            testModel.save();
            f(testModel._id);
        }
            
        else
        {
            f(req.params.id);
        }
            
    })
    .catch()

    async function f(id:mongoose.Schema.Types.ObjectId) {
        let promise = new Promise((resolve, reject) => {
            console.log('async function executed');
            Test
            .find({ "_id": id })
            .exec()
            .then( (result) => {
                var status = result[0].status;
                console.log(status);

                if (status == "4") {
                    resolve('done');
                } else {
                    f(id);
                }
            })
            .catch()
        })

        let result = await promise;
        console.log('it\'s done');
    }
}