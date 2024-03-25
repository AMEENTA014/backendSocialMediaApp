import express from 'express';
import router1 from './routes/userControllerRoute';
import dotenv from 'dotenv';
import cookieParser  from 'cookie-parser';

dotenv.config();
const app=express();
app.use(express.json())
app.use(cookieParser());
app.use('/api/User',router1);
app.listen(process.env.PORT,()=>{

    console.log(`listening to port ${process.env.PORT}`);
})
