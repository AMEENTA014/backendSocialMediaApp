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
  await createUserModel(userData)
  res.status(200).cookie('token',await middleWares.createToken(userData),{httpOnly:true}).send('signUpSuccessLoginned');
}
  }
      catch(err) {
       return next(err);
     }
}
