import { SubStatus } from "@prisma/client";
import { prisma } from "../prisma.js";
export const updateSubModel=async(submissionId,subData)=>{
   try {
      if(!(subData.status)||!(Object.values(SubStatus).includes(subData.status))){
         throw new Error("notaDefinedStatus");
      }
       return await prisma.submission.update({data:{subData},where:{
        submissionId:submissionId
      }});
   }catch(err){
      throw new Error("databaseError"+err.message);
   }
}