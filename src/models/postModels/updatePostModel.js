import {prisma}from '../prisma'
export const updatePostModel=async(postData)=>
{
    try
    {
    const updatedPost= await prisma.post.update({
      where: 
      {
        id:postData.id
      },
      data: 
      {
        title:postData.title,
        content:postData.content
      },
    });
    return updatedPost;
    }
    catch(err)
    {
     throw err
    }
}
  