import { prisma } from "../prisma.js";
export const deleteRequestModel=async(requestId)=>{
   try{
      return await prisma.pointConversionRequest.delete({
       where:{requestId:requestId}
    })
   }catch(err){
      throw new Error("newDataBaseError"+err.message);
   }
}