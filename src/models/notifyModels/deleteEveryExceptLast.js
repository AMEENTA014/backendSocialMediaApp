import { AppStatus, MsgStatus } from "@prisma/client";
import { prisma } from "../prisma.js";
export const deleteEveryExceptLastModel = async (userId,type,record) => {
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
       notifyId:{
        not:record.notifyId
       }
       
    }});
    return ;
  }catch(err){
      throw new Error("databaseerror"+err);
    }
  };