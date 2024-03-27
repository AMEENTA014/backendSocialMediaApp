import {prisma} from '../prisma.js'


export async function getUserByEmailModel(email) {
  try{
   const User=await prisma.user.findUnique({ where: { email:email } })
   return User;
    }  
    catch(err)
    {
      throw err
    };
  
}