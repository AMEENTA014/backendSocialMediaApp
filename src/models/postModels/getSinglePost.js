import {prisma}from '../prisma.js'
  export const getSinlePostModel=async(postId)=>
  {
    try{ const post= await prisma.post.findUnique({
      where: {
        postId
      },
    });
    return post;
}
catch(err)
{
throw err
}
  }
  
  