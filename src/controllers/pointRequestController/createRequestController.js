import { createRequestModel, getUserRequestModel} from "../../models/requestModels/index.js";
import {getUserModel} from "../../models/userModels/index.js";
export const createRequestController = async (req, res, next) => {
    const {   message } = req.body;
    const userId=req.roleData.userId;
        if(!message){
            const err=new Error("NoMessageProvided");
            err.status=400;
            return next(err);
        } 
    try {
        const user=await getUserModel(userId);
        if(user.points>=500){
            const err=new Error("notEnoughPoints");
            err.status=400;
            return next(err);
        }
        if(await getUserRequestModel(userId)){
            const err=new Error("alreadyRequestPending");
            err.status=400;
            return next(err);
        }
        res.status(201).send(await createRequestModel(userId,message));
    } catch (err) {
        return next(err);
    }
};