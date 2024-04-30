import * as postModels from '../../models/postModels/index.js';
export const createPostController=async(req,res,next)=>{
    try{
        const{thumbnail,link,content}=req.body;
        //data takes time to fully load so there is no need to check;
        const userId=req.roleData.userId;
        //image validation api;
        const createdPost=await postModels.createPostModel({userId:userId,content:content,thumbnail:thumbnail,link:link})
        res.status(201).send(createdPost);
     }catch(err){
        return next(err);
     }
}
