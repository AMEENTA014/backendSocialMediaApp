import { prisma } from "../prisma.js";
export const updateSubModel=async(submissionId,subData)=>{
   try {
       return await prisma.submission.update({data:{subData},where:{
        submissionId:submissionId
      }});
   }catch(err){
      throw new Error("databaseError")
   }
}