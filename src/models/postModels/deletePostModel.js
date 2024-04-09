import {prisma}from '../prisma.js'
export const deletePostModel=async(postId)=>
  {
    try{
    return deletedPost= await prisma.post.delete({
      where: 
      {
        postId:postId
      },
    });
  }catch(err)
    {
      throw new Error('dataBaseError'+err.message);
    }
  }