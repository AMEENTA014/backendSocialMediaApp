import { MsgStatus } from "@prisma/client";
import { deleteEveryExceptLastModel, deleteNotificationModel, getLastNotificationsModel } from "../../models/notifyModels/index.js";
import { prisma } from "../../models/prisma.js";

export const getNotifications = async (req,res,next) => {
  const userId=req.roleData.userId;
  const types = ['APP', 'SUB', 'REQ','TSK'];
  let finalNotifications = [];
try{
 
  for (let type of types) {
    let lastReadNotification = getLastNotificationsModel(userId,type,MsgStatus.READ);
    let lastPendingNotification = getLastNotificationsModel(userId,type,MsgStatus.PENDING);
    let results=await prisma.$transaction([lastReadNotification,lastPendingNotification]);
   if((results[1].length===0)){
    continue;
   }
   else{
    if(results[0].length!==0)
    {
      if(results[0][0].newStatus===results[1][0].newStatus){
         await deleteNotificationModel(userId,type);
      }else{
         await deleteEveryExceptLastModel(userId,type,results[1][0]);
         finalNotifications.push(results[1][0]);
      }
    }
    else
      {
        await deleteEveryExceptLastModel(userId,type,results[1][0]);
        finalNotifications.push(results[1][0]);
      }
    }
   }
   res.status(200).send(finalNotifications)
}
 catch(err){
  return next(err);
 }
};