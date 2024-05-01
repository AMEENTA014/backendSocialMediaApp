import {prisma}from '../prisma.js'
import {Role}from '@prisma/client'
export const  createUserModel=async(user)=> 
{ 
  try{
     if (!(user.role)||!Object.values(Role).includes(user.role)) {
        throw new Error(`Invalid role: ${user.role}or roleNotProvided`);
    }
     return await prisma.user.create({ data: 
      {
      email   : user.email,
      userName: user.userName,
      password:user.password,
      role:user.role
      }
    })
  }catch(err){
    throw new Error("databaseError"+err.message);
  }
}
