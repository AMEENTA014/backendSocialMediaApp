import { AppStatus, Role } from "@prisma/client";
import { getRequestModel, updateRequestModel } from "../../models/requestModels/index.js";
export const updatePointRequestController = async (req, res, next) => {
    const {userId, requestId ,Rdata} = req.body;
    if(!requestId||!Rdata){
       const err=new Error("noRequestIdProvidedOrDataProvided");
       err.status=400;
       return next(err);
    }
    try {
        if((req.roleData.userId!==userId)){
            const err= new Error("forbidden");
            err.status=403;
            return next(err);
        }
        const request=await  getRequestModel(requestId);
        if((request.status!==AppStatus.APPLIED)){
            const err= new Error("cantUpdate");
            err.status=403;
            return next(err);
        }
        Rdata.userId=userId;
        res.status(200).send(await updateRequestModel(requestId,Rdata));
    } catch (err) {
        return next(err);
    }
};