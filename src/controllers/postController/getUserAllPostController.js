import * as postModels from '../../models/postModels/index.js';
import { getUserModel } from '../../models/userModels/getUserModel.js';

export const getUserAllPostController = async(req, res, next) => {
    const {userId,code} = req.body;
    if (!userId) {
       userId=req.roleData.userId;
    }
    if (!userId) {
        const err = new Error('UserIdNotFoundInRequest');
        err.status = 400;
        return next(err);
    }
    try {
        if(!(await getUserModel(userId))){
        const err = new Error('UserNotFound');
        err.status = 404;
        return next(err);
        }
        if(!code){
            res.status(200).send(await postModels.getUserAllPost(userId));
        }
        const posts = await postModels.userAllPostWLAC(userId);
        res.status(200).send(posts);
    } catch(err) {
        return next(err);
    }
}