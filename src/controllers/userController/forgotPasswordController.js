import * as userModels from '../../models/userModels/index.js';
import * as middleWares from '../../middleWares/index.js'
import { setExpire, setValue } from '../../models/redis/redis.js';
import { cacheServerPromise } from '../../main.js';
export const forgotPasswordController=async(req, res,next)=>{
    const {email} = req.body;
    if(!email){
        const err = new Error("EmailRequired");
        err.status = 400;
        return next(err);
      }
    try{
    const user = await userModels.getUserByEmailModel( email );
    if (!user) {
      const err=new Error( "User doesnt exists");
        err.status=400;
        return next(err);  
    }
    const resetId = await middleWares.generateUniqueId();
    await setValue(await cacheServerPromise,resetId, JSON.stringify({ email: email,userId:user.userId }));
    await setExpire(await cacheServerPromise,resetId, 600); 
    const resetLink = `${process.env.RESETLINK}/${resetId}`;
    await middleWares.sendEMail(email,'resetPass',`Click this link to reset your password: ${resetLink}`);
    res.status(200).send({ message: "ResetLinkSent" });
     }catch(err){
     return next(err);
    }
}

