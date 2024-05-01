import { prisma } from "../prisma.js";
export const deleteSubModel = async(submissionId) => {
   try {
      if(!submissionId){
         return prisma.$transaction([]); // return an empty Prisma transaction
      }
      const value = await prisma.submission.delete({where:{
        submissionId:submissionId
      }});
      return value;
   } catch(err) {
      throw new Error("databaseError");
   }
}