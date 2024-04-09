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
          const {otp,secret}=await middleWares.generateOtp();
          const id=await middleWares.generateUniqueId();
          await setValue(await cacheServerPromise,id, JSON.stringify({
            otp:otp,
            email:email,
            secret:secret,
            action:'signUp'
          }));
          await setExpire(await cacheServerPromise,id,600);
          const message=`your otp is ${otp}.click this link for password reset or signup ${process.env.VERIFYLINK}?id=${id}`;
          res.status(200).send( await middleWares.sendEMail(email,'forgotPass',message));
     }catch(err){
     return next(err);
    }
}

