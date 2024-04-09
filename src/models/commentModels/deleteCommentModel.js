import { prisma } from "../prisma.js";
export const deleteCommentModel=async(commentId)=>{
    try{
        return prisma.comment.delete({
            where:{commentId:commentId}
        });
    } catch(err){
       throw new Error("dataBaseError"+err.message);
    }
}