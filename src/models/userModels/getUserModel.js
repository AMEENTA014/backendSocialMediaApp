import {prisma}from '../prisma.js';
export const getUserModel=async(userId)=>{
  try{
  return await prisma.user.findUnique({where:{userId:userId}});
  }catch(err){
    throw new Error("database Error"+err.message);
  }

}