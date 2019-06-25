import mongoose, {Document} from 'mongoose';
import {Response} from 'express-serve-static-core';
import {Request} from 'express-serve-static-core';
import {NextFunction} from 'express-serve-static-core';
import {ResponseHelper} from '../../../Engine/index';
import User_Quest, {IUser_Quest} from '../../Models/user-quest';
import userQuest from '../../Models/user-quest';

export function QuestComplete( req:Request, res: Response, next:NextFunction ) {
    const responseHelper = new ResponseHelper("QuestComplete", res, req);

    const object:Object = {}
    // const ObjectId =
    const questId:mongoose.Types.ObjectId = mongoose.Types.ObjectId(req.body.questId);

    User_Quest.findOne({"_id": mongoose.Types.ObjectId(req.body.userData.userId) })
    .exec()
    .then( (value:any) => {
        var userQuestFound:IUser_Quest;

        if (value === null) {
            const user_questModel = new User_Quest({
                _id: mongoose.Types.ObjectId(req.body.userData.userId),
                quests: []
            });
            userQuestFound = user_questModel;
        } else {
            userQuestFound = value;
        }

        //???
        // type ObjectId is missing but success pushing quest id
        // userQuestFound.quests.push(questId);

        userQuestFound.save()
        .catch(function(err:any) {
            responseHelper.HTTP_InternalServerError(err);
        })

        responseHelper.HTTP_OK_JSONResponse({
            "message": "Quest Completed"
        })
    })

    .catch(err => {
        console.log(err);
        responseHelper.HTTP_InternalServerError(err);
    })
}
