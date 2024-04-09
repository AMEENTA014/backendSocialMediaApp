import { prisma } from "../prisma.js";
export const getAllUserCommentModel=async(userId)=>{
    try{
        return prisma.comment.findMany({where:{userId:userId}});
    } catch(err){
       throw new Error("dataBaseError"+err.message);
    }
}