import { prisma } from "../prisma.js";
export const getUserRequestModel=async(userId)=>{
   try{
      return await prisma.pointConversionRequest.findMany({
       where:{
        userId:userId,
        status:'pending'
        },
       include:{
         user:{
            select:{
               userId:true,
               email:true,
               userName:true,
               profilePicLink:true,
               points:true,
               role:true,
               contactInfo:true
           }
         }
       }
    })
   }catch(err){
      throw new Error("newDataBaseError"+err.message);
   }
}