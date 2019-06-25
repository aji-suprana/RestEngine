import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";
import Quest from "../../Models/quest";

import {ResponseHelper} from "../../../Engine/index";

export function QuestGetById(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("QuestGetById", res, req);
    responseHelper.JsonRequest_Succeded();

    const id = req.params.questId;

    Quest
        .find({_id: id})
        .then(function(result:any) {
            console.log(result);
            // return res.status(200).json(result);
            responseHelper.HTTP_OK_JSONResponse({
                "message": "Quest Get By Id",
                result
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json(err);
        })
}