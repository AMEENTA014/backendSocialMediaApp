import {prisma} from '../prisma.js'
export async function updateUserModel(userId, userData) 
{
    try
    {
    const updatedUser=await prisma.user.update({ where: { id: userId }, data: userData })
     return updatedUser;
      }
      catch(err)
        {
         throw err;
        }
  }

  