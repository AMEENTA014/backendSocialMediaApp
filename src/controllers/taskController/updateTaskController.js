import { Role } from '@prisma/client';
import {updateTaskModel,getTaskModel} from '../../models/taskModels/index.js';
export const updateTaskController=async(req,res,next)=>{
const {userId,data,taskId}=req.body;
if(!userId||!data||!taskId){
    const err=new Error("UserIdOrTaskIdOrDataNotProvided");
    err.status=400;
    return next(err);
}
if((userId!==req.roleData.userId)&&((req.roleData.role!==Role.ADMIN))){
const err=new Error("forbidden");
err.status=403;
return next(err);
}

try{
const task=await getTaskModel(taskId);
if(!task){
const err=new Error("NoTaskExists")
err.status=404;
return next(err);
}
if((task.ownerId!=userId)&&(req.roleData.role!==Role.ADMIN)){
   const err=new Error("forbidden");
   err.status=403;
   return next(err); 
}
res.status(200).send(await updateTaskModel(taskId,data));
}
catch(err){
return next(err);
}
}