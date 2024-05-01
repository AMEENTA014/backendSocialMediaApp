import { prisma } from "../prisma.js";
export const getRequestModel=async(requestId)=>{
   try{
      return await prisma.pointConversionRequest.findUnique({
       where:{requestId:requestId}
    })
   }catch(err){
      throw new Error("newDataBaseError"+err.message);
   }
}