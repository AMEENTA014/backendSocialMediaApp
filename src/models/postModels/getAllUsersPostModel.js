import {prisma}from '../prisma.js'
export const getAllUsersPostModel=async()=>
 {
    try
    {
     return await prisma.post.findMany();
    }
    catch(err)
    {
    throw new Error("dataBaseError"+err.message);    
    }
}