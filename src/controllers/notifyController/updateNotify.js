import { MsgStatus } from '@prisma/client';
import { getNotifyModel,updateNotifyModel }from '../../models/notifyModels/index.js';
export const updateNotify=async(req,res,next)=>{
    const {requestId}=req.body;
    const userId=req.roleData.userId;
    try{
         const request=await getNotifyModel(requestId);
         if(!request){
           const err=new Error("noRequestFound");
           err.status=404;
           return next(err);
         }
        if(requestId.userId!==userId){
            const err=new Error("forbidden");
            err.status=403;
            return next(err);             
        }
        if(request.status===MsgStatus.READ){
            const err=new Error("alreadyReaded");
            err.status=400;
            return next(err);
        }
       await  updateNotifyModel(requestId,{status:MsgStatus.READ});
       res.status(200).send({message:"status changed to read"});
    }catch(err){


    }    
}