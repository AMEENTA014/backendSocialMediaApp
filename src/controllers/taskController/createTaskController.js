import {createTaskModel} from '../../models/taskModels/index.js';
export const createTaskController=async(req,res,next)=>{
    const {taskData}=req.body;
    if(!taskData){
      const err=new Error("NoDataProvided");
      err.status=400;
      return next(err);
    }
    taskData.ownerId=req.roleData.userId;
    try{ 
       res.status(201).send(await createTaskModel(taskData));
    }catch(err){
     return next(err);
    }
}