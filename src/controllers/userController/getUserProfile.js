import {getUserModel}from '../../models/userModels/index.js';
export const getUserProfile=async(req,res,next)=>{
    const userId=req.roleData.userId;
    try{
       res.status(200).send(await getUserModel(userId));
    }catch(err){
        return next(err);
    }
}