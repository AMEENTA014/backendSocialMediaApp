import {createClient} from 'redis';
import dotenv from 'dotenv';
dotenv.config({path:"../../../.env"});
const  initializeRedisClient = async () => {
     const cacheServer = createClient({ url: process.env.REDIS_URL });
    cacheServer.on('error', err => { console.log(`Redis error: ${err}`) });
    try {
      await cacheServer.connect();
      console.log('Connected to Redis');
    } catch (err) {
        throw new Error("redisConnectionError"+err.message);
    }
    return cacheServer;
  };
  export default initializeRedisClient;
  