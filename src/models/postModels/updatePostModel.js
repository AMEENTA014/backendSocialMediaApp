import {prisma}from '../prisma.js'
export const updatePostModel=async(postId,postData)=>
{
    try
    {
    return await prisma.post.update({
      where: 
      {
        postId:postId
      },
      data:postData
      
    });
    }
    catch(err)
    {
     throw new Error('dataBaseError'+err.message);
    }
}
  