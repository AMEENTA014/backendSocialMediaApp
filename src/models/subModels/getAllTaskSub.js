import { prisma } from "../prisma.js";
export const getAllTaskSubModel=async(taskId)=>{
   try {
       return await prisma.submission.findMany({where:{
        taskId:taskId
      }});
   }catch(err){
      throw new Error("databaseError")
   }
}