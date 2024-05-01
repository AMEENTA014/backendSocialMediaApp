import { Role } from '@prisma/client';
import {getPostModel,deletePostModel}from '../../models/postModels/index.js';
export const deletePostController=async(req,res,next)=>{
    const {userId,postId}=req.body;
    if (!userId || !postId) {
        const err= new Error('NoUserIdOrPostIdProvided');
        err.status=400;
        return next(err);
    }
    try{
        if ((req.roleData.userId !==userId)&&(req.roleData.role!==Role.ADMIN)) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        const post=await getPostModel(postId);
        if(!post){
            const err= new Error('postNotFound');
            err.status=404;
            return next(err);
        }
        if ((post.userId!== userId)&&(req.roleData.role!==Role.ADMIN)) {
            const err= new Error('Forbidden');
            err.status=403;
            return next(err);
        }
     res.status(200).send(await deletePostModel(postId))
     }catch(err){
        return next(err);
     }
}