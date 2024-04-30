import { prisma } from "../prisma.js";
export const getTaskAllSubModel=async(taskId)=>{
   try {
       return await prisma.submission.findMany({where:{
        taskId:taskId
      }});
   }catch(err){
      throw new Error("databaseError")
   }
}