import {prisma}from '../prisma.js';
  export const getPostModel=async(postId)=>
  {
    try{
    return await prisma.post.findUnique({
      where: {
        postId:postId
      },
    });
      }catch(err)
      {
        throw new Error('dataBaseError'+err.message);
      }
  }