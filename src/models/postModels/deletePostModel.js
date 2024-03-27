import {prisma}from '../.js'
export const deletePostModel=async(postId)=>
  {
    try{
    const deletedPost= await prisma.post.delete({
      where: 
      {
        postId
      },
    });
    return deletedPost;
  }
    catch(err)
    {
      throw err
    }
  }