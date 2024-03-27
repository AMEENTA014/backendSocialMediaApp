import {prisma}from '../prisma.js';
  export const getAllPostModel=async(userId)=>
  {
    try{
    const posts=await prisma.post.findMany({
      where: {
        userId,
      },
    });
    return posts;
      }catch(err)
      {
        throw err
      }
  }