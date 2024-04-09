import {prisma} from '../prisma.js'
export async function getUserByEmailModel(email) {
  try{
  return await prisma.user.findUnique({ where: { email:email } })
  }catch(err){
    throw new Error(`DataBaseError${err.message}`);
  }
}