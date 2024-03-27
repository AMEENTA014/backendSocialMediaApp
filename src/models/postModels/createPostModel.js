import {prisma}from '../prisma.js'
export const createPostModel=async(postData)=>
{
   try
   {
     const createdPost=await prisma.post.create({data:
    {
      postId:postData.postId,
      userId:postData.userId,
      content:userId.content,
      timeStamp:userId.timeStamp  
     }
    });
    return createdPost;
   }
   catch(err){throw err}
}