import { AppStatus, MsgStatus } from "@prisma/client";
import { prisma } from "../prisma.js";
export const deleteNotificationModel = async (userId,type) => {
  const types=['SUB','APP','REQ','TSK']; 
  try{
   if(!(type)||(!types.includes(type))){
    const err=new Error("NotValidtype");
    err.status=400;
    throw err;
   } 
   await prisma.notification.deleteMany({
      where: {
        userId:userId,
       status:
        MsgStatus.PENDING,
       type:type,
       
    }});
    return true
  }catch(err){
      throw new Error("databaseerror"+err);
    }
  };