import  * as jwt from 'jsonwebtoken'
import {Response} from "express-serve-static-core";
import {Request} from "express-serve-static-core";
import {NextFunction} from "express-serve-static-core";

export function checkAuth(req:any,res:Response,next:NextFunction){
    console.log("Checking Authorization");
    try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token.split(" ")[1],(String)(process.env.JWT_KEY));
        req.body.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Auth Failed"
        })
    }
}