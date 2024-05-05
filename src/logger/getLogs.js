import express from 'express';
import {prisma}from '../models/prisma.js';
import * as middleWares from '../middleWares/index.js';
import { createUserModel,getUserByEmailModel,getUserModel,updateUserModel } from '../models/userModels/index.js';
import { servErr } from '../routes/servErr.js';
import { Role } from '@prisma/client';
const router=express.Router();

const getLogs=async(req,res,next)=>{
     try{
        const logs= await prisma.log.findMany({
            include:{
                user:{
                    select:{
                        userId:true,
                        userName:true,
                        email:true,
                        profilePicLink:true,
                        role:true,
                        contactInfo:true,
                    }
                }
            }
        });
        res.status(200).json(logs);
     }catch(err){
          return next(new Error("databaseError"+err));
     }
}
//userCreation and Updation for admin--use code and userId for updating to admin user, email,userName
//and password required
const createUser=async(req,res,next)=>{
    const {email,password,userName,role,code,userId}=req.body;
    if(!role||!Object.values(Role).includes(role)){
        const err=new Error("noRoleOrInvalidRole");
        err.status=400;
        return next(err);
    }
    try{
    if(code){
        if(!userId){
            const err=new Error("noUserIdProvided");
            err.status=400;
            return next(err);
        }
        const user= await getUserModel(userId);
        if(user===null){
            const err=new Error("noUserFound");
            err.status=404;
            return next(err);
        }
        await  updateUserModel(userId,{role:role});
        return res.status(200).json({message:`changed${user.userName}'s role to ${role}`});
    }
    if(!email||!password||!userName){
        const err=new Error("noUserIdProvided");
        err.status=400;
        return next(err);
    }
    if(await getUserByEmailModel(email)){
        const err=new Error("userAlreadyExists");
        err.status=400;
        return next(err);
    }
    if(await prisma.user.findUnique({where:{userName:userName}})){
        const err=new Error("needNewUserName");
        err.status=400;
        return next(err);
    }
      const created=await  createUserModel({email:email,password:await hashPass(password),userName:userName});
       res.status(200).json(created);
   
    }catch(err){
        return next(new Error("databaseError"+err));
    }
}
router.use(servErr);
router.get('/getLogs',middleWares.authenticate,middleWares.authorize(['ADMIN']),getLogs);
router.post('/createUser',middleWares.authenticate,middleWares.authorize(['ADMIN']),createUser);
export default router;