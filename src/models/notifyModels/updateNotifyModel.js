import { prisma } from "../prisma.js";
export const updateNotifyModel=async(requestId,Ndata)=>{
     try{
        return await prisma.notification.update({where:{
            requestId:requestId
        },
        data:{
            Ndata
        }
    });
     }catch(err){
       throw new Error("databaseError"+err);
     }
}