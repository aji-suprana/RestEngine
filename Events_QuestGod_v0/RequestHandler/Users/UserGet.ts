import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import User, {IUser} from "../../../Events_Authentication_v0/Models/user";

import {ResponseHelper} from "../../../Engine/index";

export function UserGet(req:Request, res: Response, next: NextFunction) {
    const responseHelper = new ResponseHelper("UserGet", res, req);
    responseHelper.JsonRequest_Succeded();

    User
        .find()
        .then(function(result:any) {
            console.log(result);
            responseHelper.HTTP_OK_JSONResponse({
                "message": "User Get",
                result
            })
        })
        .catch( err => {
            console.log(err);
            responseHelper.HTTP_InternalServerError(err);
        })
}