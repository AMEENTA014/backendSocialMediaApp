import {getTaskAppModel,taskAllAppWTAU} from '../../models/applicationModels/index.js';
import {getTaskModel}from '../../models/taskModels/index.js';
export const getTaskAppController=async(req,res,next)=>{
    const {taskId,code}=req.body;
    if(!taskId){
        const err=new Error("noTaskIdProvided");
        err.status=400
        return next(err);
    }
    try{
        if(! await getTaskModel(taskId)){
            const err=new Error("tasknotFound");
            err.status=404;
            return next(err);
        }
        if(!code){
           return  res.status(200).send(await getTaskAppModel(taskId));
        }
        res.status(200).send(await taskAllAppWTAU(taskId));
    }catch(err){return next(err);}

}