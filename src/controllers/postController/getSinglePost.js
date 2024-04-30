import { getPostModel,getPostWLAC} from "../../models/postModels/index.js";
export const getSinglePost=async(req,res,next)=>{
    const {postId,code}=req.body;
    if(!postId){
        const err=new Error("giveMePostId")
        res.status=400;
        return next(err);
    }
  try{
     const post= await getPostModel(postId);
     if(!post){
        const err=new Error("noPostFound");
        err.status=404;
        return next(err);
         }
         if(code){
          res.status(200).send(await getPostWLAC(postId));  
         }
    res.status(200).send(post);   
  }catch(err){
    return next(err);
  }
}