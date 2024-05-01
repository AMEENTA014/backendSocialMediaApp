import { getRequestModel } from "../../models/requestModels/getRequestModel.js";
import {getUserAllSubModel}from '../../models/subModels/index.js';
export const userAllSubmission=async(req,res,next)=>{
    const {requestId}=req.body;
    if(!requestId){
        const err=new Error("forbidden");
        err.status=403; 
        return next(err);
    }
    try{
       const request=await getRequestModel(requestId);
       if(!request){
        const err=new Error("cantViewUserSubWithoutRequest");
        err.status=403; 
        return next(err);
       }
       res.send(getUserAllSubModel(request.userId));
         
    }catch(err){

    }
}