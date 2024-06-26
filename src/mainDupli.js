import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import cookieParser  from 'cookie-parser';
import {createClient} from 'redis';
dotenv.config({path:"../.env"});
import routerUser from './routes/userRoute.js';
import routerPost from './routes/postRoute.js';
import routerLike from './routes/likeRoute.js';
import routerComment from './routes/commentRoute.js';
import routerTask from './routes/taskRoute.js';
import routerApplication from './routes/appRoute.js';
const app=express();
 app = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/User',routerUser);
app.use('/api/Post',routerPost);
app.use('/api/Like',routerLike);
app.use('/api/Comment',routerComment);
app.use('/api/App',routerApplication);

let cacheServerPromise;
const  initializeRedisClient = async () => {
  const cacheServer = createClient({ url: process.env.REDIS_URL });
 cacheServer.on('error', err => { console.log(`Redis error: ${err}`) });
 try {
   await cacheServer.connect();
   console.log('Connected to Redis');
   return cacheServer;
 } catch (err) {
     throw new Error("redisConnectionError"+err.message);
 }
};
initializeRedisClient().then((client)=>{
  cacheServerPromise=client;
  app.listen(process.env.PORT,()=>{
    console.log(`${process.env.PORT}listening to port `)
  })
}).catch(err=>console.log(err));
export {cacheServerPromise};