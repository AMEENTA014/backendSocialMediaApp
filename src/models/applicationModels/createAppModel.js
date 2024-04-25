import {prisma} from '../prisma.js';
export const createAppModel=async(appData)=>{
   try{
     return await prisma.application.create({data:{
        applicationDate:new Date(),
        userId:appData.userId,
        taskId:appData.taskId
     }});
   }catch(err){
      throw new Error("dataBaseError");
   }

}