import { prisma } from "../prisma.js";
export const getLikeModel=async(likeId)=>{
    try{
     return await prisma.like.findUnique({where:{likeId:likeId}})
     }catch(err){
      throw new Error("dataBaseError");
    }
}