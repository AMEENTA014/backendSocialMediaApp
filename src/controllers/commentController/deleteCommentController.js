import { Role } from '@prisma/client';
import {getPostModel}from '../../models/postModels/index.js';
import {getCommentModel,deleteCommentModel} from '../../models/commentModels/index.js';
export const deleteCommentController=async(req,res,next)=>{
    const {userId,commentId}=req.params;
    if (!commentId) {
      const err= new Error('commentIdNotProvided');
      err.status=400;
      return next(err);
  }
    
    try{
      const comment = await getCommentModel(commentId);
      if(!comment){
        const err=new Error("commentNotFound");
        err.status=404;
        return next(err);
      }
      //comments will be deleted if post deleted 
      const post=await getPostModel(comment.postId);
      if((userId!==req.roleData.userId)&&(req.roleData.role!==Role.ADMIN)&&(post.userId!==userId)){
        const err=new Error("forbidden");
        err.status=403;
        return next(err);
 }
      if ((req.roleData.userId !== comment.userId)&&(req.roleData.role!==Role.ADMIN)&&(post.userId!==userId)) {
          const err = new Error('Forbidden');
          err.status = 403;
          return next(err);
      }
        res.status(200).send(await deleteCommentModel(commentId));
     }catch(err){
        return next(err);
     }
}