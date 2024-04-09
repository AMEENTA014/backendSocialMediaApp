import * as commentModels from '../../models/commentModels/index.js';
export const updateCommentController=async(req,res,next)=>{
    const {commentId,data,userId}=req.body;
    if(!commentId||!data||!userId){
      const err=new Error("noDataProvidedOrCommentIdOrUserId");
      err.status=400;
      return next(err);
    }
    if(req.roleData.userId !==userId){
      const err=new Error('forbidden');
      err.status=403;
      return next(err);
    }
    try{
      if(!(await commentModels.getCommentModel(commentId))){
        const err = new Error('commentNotFound');
        err.status = 403;
        return next(err);
      }
      const comment = await commentModels.getCommentModel(commentId);
      if (req.roleData.userId !== comment.userId) {
          const err = new Error('Forbidden');
          err.status = 403;
          return next(err);
      }
        res.status(200).send(await commentModels.updateCommentModel(commentId,data));
     }catch(err){
        return next(err);
     }
}