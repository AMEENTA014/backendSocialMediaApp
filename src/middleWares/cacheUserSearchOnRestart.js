import { cacheServerPromise } from "../main.js";
import { prisma } from "../models/prisma.js";
import { addUserNameToRedis } from "../models/redis/redis.js";
export const cacheUserSearchOnRestart=async()=>{
    
    try{const users = await prisma.user.findMany({
      select: {
        userName: true
      },
    });
   const cacheServer=await cacheServerPromise;
    for (const user of users) {
        await addUserNameToRedis( cacheServer, user.userName);
      }
      return true;
  }catch(err){
    console.log(err.message);
    throw err;
  }
}
