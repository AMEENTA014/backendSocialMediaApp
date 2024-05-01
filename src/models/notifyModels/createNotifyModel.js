import { prisma } from "../prisma.js";
export const createNotifyModel=async(Data)=>{
    try {
    return  await prisma.notification.create({data:{
      userId:Data.userId,
      title:Data.title,
      newStatus:Data.newStatus,
      message:Data.message,
      type:Data.type,
      referenceId:Data.referenceId,
    }
    });
    
  } catch (error) {
    console.error(error);
  }}