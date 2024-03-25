import { PrismaClient } from '@prisma/client/edge'
const prisma = new PrismaClient() 

export async function getUserByEmailModel(email) {
  return await prisma.user.findUnique({ where: { email } })
  .then(User=>{return User})
  .catch(err=>{throw err});
  
}

export async function createUserModel(user) {
    return await prisma.user.create({ data: user })
    .then(createdUser=>
    {
      return createdUser;
    })
    .catch(err=>
    {
      throw err;   
    });
                                            }     
  
  export async function updateUserModel(userId, userData) {
    return await prisma.user.update({ where: { id: userId }, data: userData })
    .then(updatedUser=>
      {
       return updatedUser;
    
      })
      .catch(err=>
        {
         throw err;

        })
  }
  