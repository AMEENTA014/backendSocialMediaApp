import { prisma } from "../prisma.js";
export const getAllUserSubModel=async(userId)=>{
   try {
       return await prisma.submission.findMany({where:{
        userId:userId
      }});
   }catch(err){
      throw new Error("databaseError")
   }
}