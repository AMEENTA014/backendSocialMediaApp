import {getAllTaskAppModel} from '../../models/applicationModels/index.js';
import {getTaskModel}from '../../models/taskModels/index.js';
export const getAllTaskAppController=async(req,res,next)=>{
    const {taskId}=req.body;
    try{
        if(! await getTaskModel(taskId)){
            const err=new Error("tasknotFound");
            err.status=404;
            return next(err);
        }
        res.status(200).send(await getAllTaskAppModel(taskId));
    }catch(err){return next(err);}

}