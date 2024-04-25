import { prisma } from "../prisma.js";
export const deleteAppModel=async(appId)=>{
   try{
      return prisma.application.delete({where:{applicationId:appId}})
   }catch(err){
    throw new Error("dataBaseError");
   }

}