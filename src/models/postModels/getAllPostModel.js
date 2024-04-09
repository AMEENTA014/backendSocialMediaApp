import {prisma}from '../prisma.js';
  export const getAllPostModel=async(userId)=>
  {
    try{
    return await prisma.post.findMany({
      where: {
        userId:userId
      },
    });
      }catch(err)
      {
        throw new Error('dataBaseError'+err.message);
      }
  }