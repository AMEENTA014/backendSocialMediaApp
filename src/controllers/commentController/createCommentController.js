import {createCommentModel}from '../../models/commentModels/index.js';
import { getPostModel } from '../../models/postModels/getPostModel.js';
export const createCommentController=async(req,res,next)=>{
    const {postId,userId,content}=req.body;
    if (!userId||!postId||!content) {
        const err= new Error('NoUserIdOrPostIdProvidedOrContent');
        err.status=400;
        return next(err);
    }
    try{
        if (req.roleData.userId !==userId) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        if(!(await getPostModel(postId))){
            const err = new Error('NoPostFound');
            err.status = 404;
            return next(err);
        }
        res.status(201).send(await createCommentModel({postId,userId,content}));
     }catch(err){
        return next(err);
     }
}
