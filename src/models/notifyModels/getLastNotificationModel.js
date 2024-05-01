import { AppStatus, MsgStatus } from "@prisma/client";
import { prisma } from "../prisma.js";
export const getLastNotificationsModel = async (userId,type,status) => {
  const types=['SUB','APP','REQ','TSK']; 
  try{
  if(!(status)||(!Object.values(MsgStatus).includes(status))){
    const err=new Error("notValidStatus");
    err.status=400;
    throw err;
   } 
   if(!(type)||(!types.includes(type))){
    const err=new Error("NotValidtype");
    err.status=400;
   throw err;
   } 
  return  await prisma.notification.findMany({
      where: {
        userId: userId,
        status: status,
        type:type
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
    catch(err){
      throw new Error("databaseerror"+err);
    }
  };