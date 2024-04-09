import {getAllCommentModel}from '../../models/commentModels/index.js';
export const getAllComment=async(req,res,next)=>{
    const {postId}=req.params;
    if (!postId){
      const err= new Error('NoPostIdProvided');
      err.status=400;
      return next(err);
  }
    try{
        res.status(200).send(await getAllCommentModel(postId));
     }catch(err){
        return next(err);
     }
}