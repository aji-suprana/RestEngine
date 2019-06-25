import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import User, {IUser} from "../../../Events_Authentication_v0/Models/user";
import {ResponseHelper} from "../../../Engine/index";

export function UserUpdate(req:Request, res:Response, next:NextFunction) {
    const responseHelper = new ResponseHelper("UserUpdate", res, req);
    responseHelper.JsonRequest_Succeded();
    
    const id = req.body.userId
    const userType = req.body.userData.userType;
    console.log(req.body.userData);

    if (userType != "User") {
        User.updateOne({_id: id}, {$set:req.body})
            .then(function(result:Document) {
                User.find({_id: id})
                    .exec()
                    .then(function(result:any){
                        return responseHelper.HTTP_OK_JSONResponse({
                            'message': 'user updated',
                            result
                        })
                    })
            })
    
            .catch(function(err) {
                console.log(err);
                responseHelper.HTTP_InternalServerError(err);
            })

    } else {
        return responseHelper.HTTP_Unauthorized("Invalid access");
    }

}