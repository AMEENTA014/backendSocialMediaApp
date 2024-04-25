import {deleteTaskModel,getTaskModel} from '../../models/taskModels/index.js';
export const deleteTaskController=async(req,res,next)=>{
    const {userId,taskId}=req.body;
    if(!taskId||!userId){
    const err=new Error("taskIdOrUserIdNotProvided");
    err.status=400;
    return next(err);
    }
    if(req.roleData.userId !==userId){
        const err=new Error("forbidden");
        err.status=403;
        return next(err);
    }
    try{
    const task=await getTaskModel(taskId);
    if(!task){
      const err=new Error("noTaskExist");
      err.status=404;
      return next(err);
    }
  if(task.ownerId!==userId){
    const err=new Error("forbidden");
    err.status=403;
    return next(err);
    }
    res.status(200).send(await deleteTaskModel(taskId));
    }catch(err){
       return next(err);
    }
}
