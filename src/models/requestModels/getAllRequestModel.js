import { prisma } from "../prisma.js";
export const getAllRequestModel=async()=>{
   try{
      return await prisma.pointConversionRequest.findMany();
   }catch(err){
      throw new Error("newDataBaseError"+err.message);
   }
}