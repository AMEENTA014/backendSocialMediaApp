import {prisma} from '../prisma.js'
export async function deleteUserModel(userId) 
{
    try
    {
    return await prisma.user.delete({ where: { userId: userId }})
      }
      catch(err)
        {
         throw new Error("DatabaseError"+err.message)
        }
  }