import * as postModels from '../../models/postModels/index.js';
export const createPostController=async(req,res,next)=>{
    const {userId,content}=req.body;
    if (!userId||!content) {
        const err= new Error('NoUsedProvidedOrContent');
        err.status=400;
        return next(err);
    }
    try{
        if (req.roleData.userId !==userId) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        //image validation api;
        const createdPost=await postModels.createPostModel({userId,content})
        res.status(201).send(createdPost);
     }catch(err){
        return next(err);
     }
}
