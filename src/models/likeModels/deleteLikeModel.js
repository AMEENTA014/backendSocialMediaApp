import {prisma} from '../prisma.js';
export const deleteLikeModel=async(likeId)=>{
  try{
  return await prisma.like.delete({where:{likeId:likeId}})
  }
  catch(err){
    throw new Error("dataBaseError"+err.message)
  }
}
