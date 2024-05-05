import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser';
import {createClient} from 'redis';
dotenv.config({path:"../.env"});
import { createChatServer } from './chatApp.js';
import routerLog from './logger/getLogs.js';
import routerUser from './routes/userRoute.js';
import routerPost from './routes/postRoute.js';
import routerLike from './routes/likeRoute.js';
import routerComment from './routes/commentRoute.js';
import routerTask from './routes/taskRoute.js';
import routerApplication from './routes/appRoute.js';
import routerSub from './routes/subRoute.js';
import routerNotify from './routes/notifyRoute.js';
import routerRequest from './routes/requestRoute.js';
const app=express();
const io=createChatServer(app);
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/ADMIN',routerLog)
app.use('/api/User',routerUser);
app.use('/api/Post',routerPost);
app.use('/api/Like',routerLike);
app.use('/api/Comment',routerComment);
app.use('/api/Task',routerTask)
app.use('/api/App',routerApplication);
app.use('/api/Sub',routerSub);
app.use('/api/Notify',routerNotify);
app.use('/api/Request',routerRequest);

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
  io.listen(process.env.PORT,()=>{
    console.log(`${process.env.PORT}listening to port `)
  })
}).catch(err=>console.log(err));
export {cacheServerPromise};

