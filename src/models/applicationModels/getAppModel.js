import { prisma } from "../prisma.js";
export const getAppModel=async(appId)=>{
   try{
      return prisma.application.findUnique({
        where:{applicationId:appId}
      });
   }catch(err){
    throw new Error("dataBaseError");
   }
}