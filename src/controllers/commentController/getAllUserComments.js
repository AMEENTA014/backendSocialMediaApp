import * as commentModels from '../../models/commentModels/index.js';
export const getAllUserCommentController=async(req,res,next)=>{
    const {userId}=req.params;
    if (!userId) {
        const err= new Error('NoUserId');
        err.status=400;
        return next(err);
    }
    try{
        if (req.roleData.userId !==userId) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        const AllComment=await commentModels.getAllUserCommentModel(userId)
        res.status(200).send(AllComment);
     }catch(err){
        return next(err);
     }
}