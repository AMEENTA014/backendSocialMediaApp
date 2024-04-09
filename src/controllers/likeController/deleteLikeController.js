import {getLikeModel,deleteLikeModel} from '../../models/likeModels/index.js';
export const deleteLikeController=async(req,res,next)=>{
    const {userId,likeId}=req.params;
    if (!userId || !likeId) {
        const err= new Error('NoUserIdOrLikeIdProvided');
        err.status=400;
        return next(err);
    }
    try{
        console.log(req.roleData.userId,userId)
        if ((req.roleData.userId !==userId)) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        const like=await getLikeModel(likeId);
        if(!like){
            const err= new Error('likeNotFound');
            err.status=404;
            return next(err);
        }
        if (like.userId!== userId) {
            const err= new Error('Forbidden');
            err.status=403;
            return next(err);
        }
     res.status(200).send(await deleteLikeModel(likeId))
     }catch(err){
        return next(err);
     }
}