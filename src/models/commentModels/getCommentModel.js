import { prisma } from "../prisma.js";
export const getCommentModel=async(commentId)=>{
 try{
    return await prisma.comment.findUnique({where:{commentId:commentId}})
 }
 catch(err){
  throw new Error("dataBaseError");
 }

}