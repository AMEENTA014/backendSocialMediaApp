import { prisma } from "../prisma.js";
export const getRequestWU=async(requestId)=>{
   try{
      return await prisma.pointConversionRequest.findUnique({
       where:{requestId:requestId},
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
         ,
            checkedBy:{
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