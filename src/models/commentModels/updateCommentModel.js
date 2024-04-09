import { prisma } from "../prisma.js";
export const updateCommentModel=async(commentId,data)=>{
    try{
        return prisma.comment.update({
            where:{commentId},
            data:data
        });

    } catch(err){
       throw new Error("dataBaseError"+err.message);
    }
}