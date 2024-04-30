import {prisma}from '../prisma.js';
  export const getAllPostModel=async()=>
  {
    try{
      return await prisma.post.findMany();
      }catch(err)
      {
        throw new Error('dataBaseError'+err.message);
      }
  }