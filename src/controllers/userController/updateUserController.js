import * as models from '../../models/userModels/index.js';
export const  updateUserController=async(req,res,next)=>{
   const {userId,newUserData}=req.body;
   if(!userId||!newUserData){
    const err=new Error("noUserIdOrNewDataProvided")
    err.status=400;
    return next(err);
   }
   if(userId!==req.roleData.userId){
    const err=new Error("forbidden")
    err.status=403;
    return next(err);    
   }
   try{
    //authentication implies user exists ,so there is no need for this condition 
    //same,if no authentication ee condition use cheyyam, and has other benefits in production 
    if(!(await models.getUserModel(userId))){
    const err=new Error("UserNotFound")
    err.status=404;
    return next(err); 
    }
    if (newUserData.password) {
      delete newUserData.password;
    }
    const updated=await models.updateUserModel(userId,newUserData);
    res.status(200).send(updated);
   }catch(err){
     return next(err);
   }
}