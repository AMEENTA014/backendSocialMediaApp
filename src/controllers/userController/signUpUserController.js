import * as userModels from '../../models/userModels/index.js';
import * as middleWares from '../../middleWares/index.js'
import  { setExpire, setValue } from '../../models/redis/redis.js';
import { cacheServerPromise } from '../../main.js';
export const signUpUserController=async(req,res,next)=>{
     const {email,username,password,role}=req.body;
      if (!email || !username || !password) {
        const err=new Error("All fields are requied");
        err.status=400;
        return next(err);
      }
     try{ 
      const existingUser = await userModels.getUserByEmailModel( email );
      if (existingUser) {
        const err=new Error( "User already exists");
        err.status=400;
        return next(err);
      }
      const {otp,secret}=await middleWares.generateOtp();
      const id=await middleWares.generateUniqueId();
      await setValue(await cacheServerPromise,id, JSON.stringify({
        otp:otp,
        email:email,
        secret:secret,
        pass:await middleWares.hashPass(password),
        username:username,
        role:role,
        action:'signUp'
      }));
      await setExpire(await cacheServerPromise,id,600);
      const message=`your otp is ${otp}.click this link for signup verification  ${process.env.VERIFYLINK}?id=${id}`
      const sentMail=await middleWares.sendEMail(email,'signupVerify',message) ;
      res.status(200).send(sentMail);
    }
    catch(error) {
      return next(error);
    }
  }