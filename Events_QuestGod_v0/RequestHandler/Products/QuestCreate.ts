import mongoose,{Document} from 'mongoose'

import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

import {ResponseHelper} from "../../../Engine/index";
import Quest, {IQuest} from '../../Models/quest';
import Product, {IProduct} from '../../Models/product';


export function QuestCreate(req:Request,res:Response,next:NextFunction) {
    const responseHelper = new ResponseHelper("QuestCreate",res,req);
    responseHelper.JsonRequest_Succeded(); 

    // const userType = req.body.userData.userType;

    // if(userType == "Partner" || userType == "Admin")
    // {
        Quest.find({"questName":req.body.questName})
            .exec()
            .then((quest:any) => {
                if (quest.length >= 1) {
                    return responseHelper.HTTP_UnprocessableEntity(
                        { message: "quest Existed" }
                    );
                }

                const questModel = new Quest({
                    _id: new mongoose.Types.ObjectId,
                    ownerId: req.body.productId,
                    questName: req.body.questName,
                    point: req.body.point
                })

                questModel.save()
                .then(function(result:any) {
                    SaveToContainer(questModel._id, req, responseHelper);
                    responseHelper.HTTP_OK_JSONResponse({
                        "message": "Quest created",
                        result
                    });
                })
            })
        // responseHelper.HTTP_OK_JSONResponse({message:"QuestCreate"});
    // }else{
    //     return responseHelper.HTTP_Unauthorized("invalid access!Parner account is required");
    // }
 } 

 function SaveToContainer(questID:mongoose.Schema.Types.ObjectId,req:Request, responseHelper:ResponseHelper)
 {
    //CHECK IF USER HAS CONTAINER FOR OWNED QUEST
    Product.findOne({"_id":req.params.productId})
    .exec()
    .then((value:any)=>{
        var productFound:IProduct;
        //use newly created one if not found, else use found ownedQuesy
        if(value === null){
            // const id = new mongoose.Types.ObjectId
            const productModel = new Product({
                _id: questID,
                // owner: req.body.userData.userId,
                quest: []
            });
            productFound = productModel;
            

        }else{
            productFound = value;
        }

        // productFound.quest.push(questID);

        productFound.save()
        .catch(function(err:any){
            responseHelper.HTTP_InternalServerError(err);
        })
    })
 }