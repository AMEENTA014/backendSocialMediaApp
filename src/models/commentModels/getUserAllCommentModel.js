import { prisma } from "../prisma.js";
export const getUserAllCommentModel=async(userId)=>{
    try{
        return prisma.comment.findMany({where:{userId:userId}});
    } catch(err){
       throw new Error("dataBaseError"+err.message);
    }
}