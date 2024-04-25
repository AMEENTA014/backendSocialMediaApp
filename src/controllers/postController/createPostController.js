import * as postModels from '../../models/postModels/index.js';
export const createPostController=async(req,res,next)=>{
    try{
        const{thumbnail,link,content}=req.body
        const userId=req.roleData.userId;
        //image validation api;
        const createdPost=await postModels.createPostModel({userId:userId,content:content,thumbnail:thumbnail,link:link})
        res.status(201).send(createdPost);
     }catch(err){
        return next(err);
     }
}
