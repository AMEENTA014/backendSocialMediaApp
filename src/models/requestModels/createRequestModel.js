import { prisma } from "../prisma.js";
export const createRequestModel=async({userId,points,message})=>{
   try{
      return await prisma.pointConversionRequest.create({
        data:{
            userId,
            points,
            message,
            status: 'APPLIED',
        }
    })
   }catch(err){
      throw new Error("newDataBaseError"+err.message);
   }
}