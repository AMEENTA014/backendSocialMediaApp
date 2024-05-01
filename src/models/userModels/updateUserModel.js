import {prisma} from '../prisma.js';
import { Role } from '@prisma/client';
export async function updateUserModel(userId, userData) 
{
    try
    {
      if(!(userData.role) || !(Object.values(Role).includes(userData.role))){
        const err = new Error("NotAValidRole");
        err.status = 400;
        throw err;
    }
    return await prisma.user.update({ where: { userId: userId }, data: userData })
      }
      catch(err)
        {
         throw new Error("DatabaseError"+err.message)
        }
  }
