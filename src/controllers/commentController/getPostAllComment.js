import {getPostAllCommentModel}from '../../models/commentModels/index.js';
export const getPostAllComment=async(req,res,next)=>{
    const {postId}=req.body;
    if (!postId){
      const err= new Error('NoPostIdProvided');
      err.status=400;
      return next(err);
  }
    try{
        res.status(200).send(await getPostAllCommentModel(postId));
     }catch(err){
        return next(err);
     }
}