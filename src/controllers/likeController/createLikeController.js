import { findLikeModel } from '../../models/likeModels/findLikeModel.js';
import {createLikeModel} from '../../models/likeModels/index.js';
import {getPostModel}from '../../models/postModels/index.js';
export const createLikeController=async(req,res,next)=>{
    const {postId,userId}=req.body;
    if (!userId||!postId) {
        const err= new Error('NoUserIdOrPostIdProvided');
        err.status=400;
        return next(err);
    }
    try{
        if ((req.roleData.userId!==userId)) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        const post = await getPostModel(postId);
        if (!post) {
            const err = new Error('PostDoesNotExist');
            err.status = 404;
            return next(err);
        }
        if(await findLikeModel(userId,postId)){
        const err=new Error('already liked');
        err.status=400;
        return next(err);
        }
        const createdLike=await createLikeModel({postId,userId})
        res.status(201).send(createdLike);
     }catch(err){
        return next(err);
     }
}