import { prisma } from "../prisma.js";
export const getNotifyModel=async(requestId)=>{
   try{
    if(!requestId){
        requestId=null;
    }
       return await prisma.notification.findUnique({where:{
        requestId:requestId
    }})
   }catch(err){
        throw new Error("dataBaseError"+err.message);
   }
}