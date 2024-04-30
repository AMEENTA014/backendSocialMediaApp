import { searchUsernames } from "../../models/redis/redis.js";
import { cacheServerPromise } from "../../main.js";
export const searchUser=async(req,res,next)=>{
    const {prefix}=req.query;
    if(!prefix){
        const err=new Error("entersSomethingToSearch");
        err.status=400;
        return next(err);
    }
    try{
         console.log(await cacheServerPromise);
         res.status(200).send(await searchUsernames(await cacheServerPromise,prefix));
    }catch(err){
      return next(err);
    }

}