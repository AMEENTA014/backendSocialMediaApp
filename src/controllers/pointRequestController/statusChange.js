import { AppStatus } from "@prisma/client";
import { prisma } from "../../models/prisma.js";
import {getRequestModel, updateRequestModel}from '../../models/requestModels/index.js';
import { getUserModel, updateUserModel } from "../../models/userModels/index.js";
import { createNotifyModel } from "../../models/notifyModels/index.js";
export const ReqStatusChange=async(req,res,next)=>{
  const {reqId,status}=req.body;
  const faculty=req.roleData.userId;
try{
  const facultyUser=await getUserModel(faculty);
  //input status should be correct
  //admin or faculty authorised ,no need to check anything 
  if(!reqId||!status){
    const err=new Error("noReqIdNoStatusProvided");
    err.status=404;
    return next(err);
  }
  if(!Object.values(AppStatus).includes(status)){
    const err=new Error("notAvalidStatus");
    err.status=404;
    return next(err);
  }

  const pointRequest=await getRequestModel(reqId);
  if(!pointRequest){
    const err=new Error("RequestNotfound");
    err.status=404;
    return next(err);
  }
  if(pointRequest.status===status){
    const err=new Error("cantChangeTotheSameStatus");
    err.status=400;
    return next(err);
  }
  if((pointRequest.status===AppStatus.REJECTED)||(pointRequest.status===AppStatus.ACCEPTED)){
    const err=new Error("cant DothatHere");//rejected and accepted applications cant change back ,should prompt to decide 
    err.status=403;
    return next(err);
  }
  if(status===AppStatus.ACCEPTED){
    //update the points in user table decrement 500
    const updatedUser = prisma.user.update({
      where: {
        userId: pointRequest.userId,
      },
      data: {
        points: {
          decrement: 500,
        }
          } 
  });
  const  updatedReq=updateRequestModel(reqId,{status:AppStatus.ACCEPTED,checkBy:faculty});
  const createdNotify=createNotifyModel({
    userId:application.userId,
    title:`Congrates!! Your pointRequest ACCEPTED`,
    newStatus:pointRequest.status,
    message:`your request is accepted by ${facultyUser.userName}`,
    type:'REQ',
    referenceId:pointRequest.requestId,
  });
  await prisma.$transaction([updatedUser,updatedReq,createdNotify]);
    return res.status(200).send({message:"changed status to accepted"});
  }
  const  updatedReq=updateRequestModel(reqId,{status:AppStatus.REJECTED,checkBy:faculty});
  const createdNotify=createNotifyModel({
    userId:application.userId,
    title:`Sorry!! Your pointRequest REJECTED`,
    newStatus:pointRequest.status,
    message:`your request is arejected by ${facultyUser.userName}`,
    type:'REQ',
    referenceId:pointRequest.requestId,
  });
  await prisma.$transaction([updatedReq,createdNotify]);
}catch(err){

}


}