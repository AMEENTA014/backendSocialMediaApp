import * as postModels from '../../models/postModels/index.js';
import { getUserModel } from '../../models/userModels/getUserModel.js';

export const getAllPostController = async(req, res, next) => {
    const {userId} = req.params;
    if (!userId) {
        const err = new Error('NoUserIdProvided');
        err.status = 400;
        return next(err);
    }
    try {
        if(!(await getUserModel(userId))){
        const err = new Error('UserNotFound');
        err.status = 404;
        return next(err);
        }
        const posts = await postModels.getAllPostModel(userId);
        res.status(200).send(posts);
    } catch(err) {
        return next(err);
    }
}