import { prisma } from "../prisma.js";
export const createCommentModel=async(data)=>{
    try{
        return prisma.comment.create({data:{
            postId:data.postId,
            userId:data.userId,
            content:data.content,
            timestamp:new Date()
        }});

    } catch(err){
       throw new Error("dataBaseError"+err.message);
    }


}