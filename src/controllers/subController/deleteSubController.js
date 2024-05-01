import { Role } from '@prisma/client';
import {deleteSubModel}from '../../models/subModels/index.js';
export const deleteSub=async(req,res,next)=>{
       const {subId}=req.body;
    try{
           if(req.roleData.role!==Role.ADMIN){
            const err=new Error("forbidden");
            err.status=403;
            return next(err);
           }
           const data=await deleteSubModel(subId);
            res.status(200).send({message:"deleted",deletedData:data});
    }
    catch(err){
      return next(err);
    }
}