import { prisma } from "../prisma.js";
export const createSubModel=async(subData)=>{
   try {
      return await prisma.submission.create({data:{
        submissionId:subData.submissionId,
        taskId:subData.taskId,
        userId:subData.userId,
        submissionDate:new Date()
      }})
   }catch(err){
      throw new Error("databaseError")
   }
}