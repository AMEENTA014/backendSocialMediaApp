import * as likeModels from '../../models/likeModels/index.js';
import {getPostModel} from '../../models/postModels/getPostModel.js';
export const getAllLikesController=async(req,res,next)=>{
    const {postId}=req.body;
    if(!postId){
    const err=new Error("noPostId provided");
    err.status=400;
    return next(err);
    }
    try{
        const post=await getPostModel(postId);
        if(!post){
            const err= new Error('NoPostFound');
            err.status=404;
            return next(err);
        }
        res.status(200).send(await likeModels.getAllLikes(postId))
     }catch(err){
        return next(err);
     }
}