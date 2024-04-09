import {prisma}from '../prisma.js';
export const getAllUserModel=async()=>{
  try{
  return await prisma.user.findMany();
  }catch(err){
    throw new Error("database Error"+err.message);
  }
}