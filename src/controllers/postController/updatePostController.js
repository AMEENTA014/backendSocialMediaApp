import { Role } from '@prisma/client';
import * as postModels from '../../models/postModels/index.js';
export const updatePostController = async(req, res, next) => {
    const {userId, postId, newPostData} = req.body;
    if (!userId || !postId || !newPostData) {
        const err = new Error('NoUserIdOrPostIdOrNewPostDataProvided');
        err.status = 400;
        return next(err);
    }
    if ((req.roleData.userId !==userId)&&(req.roleData.role!==Role.ADMIN)) {
        const err = new Error('Forbidden');
        err.status = 403;
        return next(err);
    }
    try {
        const post = await postModels.getPostModel(postId);
        if(!post){
            const err = new Error('postNotFound');
            err.status = 404;
            return next(err);
        }
        if ((post.userId !== userId)&&(req.roleData.role!==Role.ADMIN)) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        const updatedPost = await postModels.updatePostModel(postId,newPostData);
        res.status(200).send(updatedPost);
    } catch(err) {
        return next(err);
    }
}