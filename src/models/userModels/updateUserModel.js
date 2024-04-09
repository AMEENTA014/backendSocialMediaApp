import {prisma} from '../prisma.js'
export async function updateUserModel(userId, userData) 
{
    try
    {
    return await prisma.user.update({ where: { userId: userId }, data: userData })
      }
      catch(err)
        {
         throw new Error("DatabaseError"+err.message)
        }
  }
