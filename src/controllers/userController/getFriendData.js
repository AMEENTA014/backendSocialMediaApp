import {getUserModel}from '../../models/userModels/index.js';
export const getUserData=async(req,res,next)=>{
    const {userId}=req.body
    
    try{
        if(!userId){
        userId=req.roleData.userId;
        }
        const user=await getUserModel(userId);
       if(!user){
         const err=new Error("userNotFound");
         err.status=404;
         return next(err);
       }
       //use getfriendsModel but no schema defined 
       res.status(200).send(userId);
    }catch(err){
        return next(err);
    }
}