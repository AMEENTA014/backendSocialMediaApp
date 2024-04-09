import {createTaskModel} from '../../models/taskModels/index.js';
export const createTaskController=async(req,res,next)=>{
    const {userId,taskData}=req.body;
    if(!userId||!taskData){
      const err=new Error("noUserIdOrDataProvided");
      err.status=400;
      return next(err);
    }
    if(req.roleData.userId!==userId){
        const err=new Error("forbidden");
        err.status=403;
        return next(err);
    }
    try{ 
       res.status(201).send(await createTaskModel(taskData));
    }catch(err){
     return next(err);
    }
}