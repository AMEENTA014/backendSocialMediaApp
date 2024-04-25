import {createAppModel,findAppModel}from '../../models/applicationModels/index.js';
import {getTaskModel}from '../../models/taskModels/index.js';
import {}from '../../middleWares/index.js';
export const createAppController=async(req,res,next)=>{
     const {taskId}=req.body;
     if(!taskId){
      const err=new Error("NotaskId");
      err.status=400;
      return next(err);
     }
      try{
        const task=await getTaskModel(taskId);
     if(task){
        const err=new Error("taskNotFound");
        err.status=404;
        return next(err);
     }
     if(task.status==='IN_PROGRESS'||task.status==='COMPLETED'){
      const err=new Error("taskIsInProgressOrFinished");
      return next(err);
     }
     const userId=req.roleData.userId;
     if(await findAppModel(userId,taskId)){
       const err =new Error("already applied")
       err.status=400;
       return next(err)
      }
      res.status(201).send(await createAppModel({userId:userId,taskId:taskId}));
    }
      catch(err){
          return next(err);
      }
}