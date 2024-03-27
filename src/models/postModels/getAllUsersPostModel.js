import {prisma}from '../'
export const getAllUsersPostModel=async()=>
 {
    try
    {
     const posts=await prisma.post.findMany();
    }
    catch(err)
    {
    throw err;    
    }
}