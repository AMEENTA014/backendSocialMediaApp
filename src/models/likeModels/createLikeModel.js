import {prisma} from '../prisma.js';
export const createLikeModel =async(data)=>{
try
{
return await prisma.like.create({
        data:
        {
              postId:data.postId,
              userId:data.userId,
              timestamp:new Date()
        }
    })
 }catch(err){
      throw new Error("dataBaseError"+err.message);
 }
 }
 


