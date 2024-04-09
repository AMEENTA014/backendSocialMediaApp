import {getAllUserModel}from '../../models/userModels/index.js'
export const getAllUserController=async(req,res,next)=>{
     try{
        res.status(200).send(await getAllUserModel());
     }
     catch(err){
        return next(err);
     }

}