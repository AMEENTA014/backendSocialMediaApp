import { prisma } from "../prisma.js";
export const getPostAllCommentModel=async(postId)=>{
    try{
        return prisma.comment.findMany({
            where:{postId:postId}
        });

    } catch(err){
       throw new Error("dataBaseError"+err.message);
    }
}