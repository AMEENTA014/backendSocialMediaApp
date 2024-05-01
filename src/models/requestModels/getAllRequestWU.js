import { prisma } from "../prisma.js";
export const getAllRequestWU=async()=>{
   try{
      return await prisma.pointConversionRequest.findMany({
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
            },
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
    });

   }catch(err){
      throw new Error("newDataBaseError"+err.message);
   }
}