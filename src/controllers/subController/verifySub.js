import { Role, Status, SubStatus } from "@prisma/client";
import { getTaskWAAS, updateTaskModel } from "../../models/taskModels/index.js";
import { deleteSubModel, getTaskAllSubModel, getUserAllSubModel, updateSubModel } from "../../models/subModels/index.js";
import { prisma } from "../../models/prisma.js";
import { createNotifyModel } from "../../models/notifyModels/index.js";
export const verifySub=async(req,res,next)=>{
    const {subId,taskId,status}=req.body;
    let {rating}=req.body;
    const userId=req.roleData.userId;
    if(!subId||!taskId||!status)
    {
        const err=new Error("noSubIdOrTaskIdOrStatusIsProvided");
            err.status=404;
            return next(err);
    }
    if(!rating){
        rating =null;
    }
    try{
        const sub=await getTaskAllSubModel(taskId);
        if(!sub){
            const err=new Error("noSub");
            err.status=404;
            return next(err);
        }
        const subTask=sub[0].taskId;
       const task=await  getTaskWAAS(taskId);
       if(!task){
        const err=new Error("noTask");
            err.status=404;
            return next(err);
       }
       if((task.owner.id!==userId)&&(req.roleData.role!==Role.ADMIN)){
          const err=new Error("forbidden");
          err.status=403;
          return next(err);
        }
        if(task.status===Status.COMPLETED||(task.status===Status.OPEN)){
            const err=new Error("taskIsNotInProgress");
          err.status=400;
          return next(err);
        }
        if(sub.status===status){
            const err=new Error("UpdatingTotheSame,CanSomeone?ableTo?");
            err.status=400;
            return next(err);
        }
        if(taskId!==subTask){
            const err=new Error("submissionDoesntMatchtheTask");
            err.status=403;
            return next(err);
        }
        //IN_PROGRESS means no one is accepted and the status values can be changed to any 3 (2:3)
        //but for the status of submission currently will not be accepted since task is incomplete
        if(status===SubStatus.ACCEPTED)
        {
          const updatedTask= updateTaskModel(taskId,{status:Status.COMPLETED});
          const  updatedSub= updateSubModel(subId,{status:SubStatus.ACCEPTED,pointsAwarded:task.points,rating:rating});
          const updatedUser= prisma.user.update({
            where: { userId: sub[0].userId },
            data: { points: { increment: task.points }, }
          });
          const createdNotify=createNotifyModel({
            userId:application.userId,
            title:`your submissionAccepted ! Your ${task.title}Task submission Accepted`,
            newStatus:sub.status,
            message:`your submission ${sub[0].status} to ${status}.congrats!!checkTheLeaderBoard`,
            type:'SUB',
            referenceId:sub[0].submissionId,
          });
          await prisma.$transaction([updatedTask, updatedSub, updatedUser,createdNotify]);
          return res.status(200).send({message:"taskCompletedSubmissionVerified"});
        }
        //now the (2:3)changed to  (2:2)since already checked the accept status
         if((status===SubStatus.REJECTED)){
            const updatedSub=updateSubModel(subId,{status:SubStatus.REJECTED});
            const deletedSub=await deleteSubModel(subId);
            const createdNotify=createNotifyModel({
                userId:application.userId,
                title:`your submissionRejected ! Your ${task.title}Task submission Rejected`,
                newStatus:sub.status,
                message:`your submission ${sub[0].status} to ${status}.give a try again!!`,
                type:'SUB',
                referenceId:sub[0].submissionId,
              });
              await prisma.$transaction([updatedSub,deletedSub,createdNotify])
             
            return res.status(200).send({message:"rejected"});
        }
        //if it is 2:2 and the status is going to alter to rejected ,submission is in applied state
            const err=new Error("eitherRejectOrSelect");
            err.status=400;
            return next(err);
            //reject cheythath pinne select applied state akkan pattila for submission 
    }
    catch(err){
    return next(err);
    }
}