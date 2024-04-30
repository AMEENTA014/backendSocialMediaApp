import {getUserModel}from '../../models/userModels/index.js';
export const getUserData=async(req,res,next)=>{
    const {userId}=req.body
    if(!userId){
        const err=new Error("giveMeUserId");
        err.status=400;
        return next(err);
    }
    try{
        const user=await getUserModel(userId);
       if(!user){
         const err=new Error("userNotFound");
         err.status=404;
         return next(err);
       }
       res.status(200).send(user);
    }catch(err){
        return next(err);
    }
}