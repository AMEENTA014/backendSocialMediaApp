import { prisma } from "../prisma.js";
export const deleteSubModel=async(submissionId)=>{
   try {
       await prisma.submission.delete({where:{
        submissionId:submissionId
      }});
      return true;
   }catch(err){
      throw new Error("databaseError")
   }
}