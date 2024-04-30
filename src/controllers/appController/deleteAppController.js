import {getAppModel,deleteAppModel}from '../../models/applicationModels/index.js';
import {getTaskModel}from '../../models/taskModels/index.js';
export const deleteAppController=async(req,res,next)=>{
    const {userId,appId}=req.params;
    if (!userId || !appId) {
        const err= new Error('NoUserIdOrappIdProvided');
        err.status=400;
        return next(err);
    }
    try{
        if ((req.roleData.userId !==userId)) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        const app=await getAppModel(appId);
        if(!app){
            const err= new Error('applicationNotFound');
            err.status=404;
            return next(err);
        }
        if (app.userId!== userId) {
            const err= new Error('Forbidden');
            err.status=403;
            return next(err);
        }
        const task=await getTaskModel(app.taskId);
        if(!task){
            const err=new Error("tasknotfound");
            err.status=404;
            return next(err);
        }
        if(task.status==='COMPLETED'){
            const err=new Error("CantDelete");
            err.status=400;
            return next(err);  
        }
     res.status(200).send(await deleteAppModel(appId))
     }catch(err){
        return next(err);
     }
}