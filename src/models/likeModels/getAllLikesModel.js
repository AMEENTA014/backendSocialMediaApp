import { prisma } from "../prisma.js";
export const getAllLikes=async(postId)=>{
try{
    return  await prisma.like.findMany({
        where: {
          postId:postId
        },
      })
}catch(err){
  throw new Error("dataBaseError"+err.message);
}
}