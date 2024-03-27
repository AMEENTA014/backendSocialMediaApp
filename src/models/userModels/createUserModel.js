import {prisma}from '../prisma.js'

export async function createUserModel(user) 
{ 
  try
  {
    const createdUser= await prisma.user.create({ data: 
      {
      email   : user.email,
      userName: user.userName,
      password:user.password
      }
    })
    return createdUser;
  }
    catch(err)
    {
      throw err;   
    };
 } 