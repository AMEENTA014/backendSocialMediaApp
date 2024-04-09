import { cacheServerPromise } from '../../main.js';
import * as middleWares from '../../middleWares/index.js';
import {getValue,isExpired, setExpire, setValue} from '../../models/redis/redis.js';
import { createUserModel } from '../../models/userModels/createUserModel.js';
export const verifyController=async(req,res,next)=>{
const{otp,id}=req.body
if (!id || !otp) {
  const err = new Error("IdOrOtpNotProvided");
  err.status = 400;
  return next(err);
}
try{
  if((await isExpired(await cacheServerPromise,id))){
    const err = new Error("OtpExpired");
            err.status = 400;
            return next(err);
  }
  const data = JSON.parse(await getValue(await cacheServerPromise,id));
  if(!(await middleWares.tOtpVerify(data,otp))){
    const err = new Error("InvalidOtp");
    err.status = 400;
    return next(err);
}
if (data.action === 'signUp') {
  const userData={
    email :data.email,
  userName: data.username,
  password:data.pass,
  role:data.role
}
  res.status(201).send(await createUserModel(userData));
} else if (data.action === 'forgot_pass') {
  const resetId = await middleWares.generateUniqueId();
   await setValue(await cacheServerPromise,resetId, JSON.stringify({ email: data.email }));
   await setExpire(await cacheServerPromise,resetId, 600); 
   const resetLink = `${process.env.RESETLINK}/${resetId}`;
   await middleWares.sendEMail(data.email,'resetPass',`Click this link to reset your password: ${resetLink}`);
   res.status(200).send({ message: "ResetLinkSent" });
}
  }
      catch(err) {
       return next(err);
     }
}
