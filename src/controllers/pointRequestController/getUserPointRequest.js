import { Role } from "@prisma/client";
import { getUserRequestModel } from "../../models/requestModels/index.js";
export const getUserPointRequestController = async (req, res, next) => {
    const { userId } = req.body;
    if(!userId){
        userId=req.roleData.userId
    }
    
    try {
        if((userId!==req.roleData.userId)&&(user.roleData.role!==Role.ADMIN)){
            const err=new Error("forbidden");
            err.status=403;
            return next(err);
        }
        const requests = getUserRequestModel(userId);
        if(requests.length>0){
            return res.status(200).send(requests);
        }
        res.status(404).send({error:"requestNotfound"});
    } catch (err) {
        return next(err);
    }
};