import {getCommentModel,deleteCommentModel} from '../../models/commentModels/index.js';
export const deleteCommentController=async(req,res,next)=>{
    const {userId,commentId}=req.params;
    if (!commentId) {
      const err= new Error('commentIdNotProvided');
      err.status=400;
      return next(err);
  }
    if(userId!==req.roleData.userId){
           const err=new Error("forbidden");
           err.status=403;
           return next(err);
    }
    try{
      const comment = await getCommentModel(commentId);
      if(!comment){
        const err=new Error("commentNotFound");
        err.status=404;
        return next(err);
      }
      if (req.roleData.userId !== comment.userId) {
          const err = new Error('Forbidden');
          err.status = 403;
          return next(err);
      }
        res.status(200).send(await deleteCommentModel(commentId));
     }catch(err){
        return next(err);
     }
}