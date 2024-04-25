import * as userModels from '../../models/userModels/index.js';
import * as middleWares from '../../middleWares/index.js';
export const loginUserController=async(req,res,next)=>{
let  {email,password}=req.body;
      if (!email || !password) {
        let err=new Error("both email and pass required");
        err.status=400;
        return next(err);
      } 
  try{
     const  user = await userModels.getUserByEmailModel( email );
  if (!user) { 
    let err=new Error("User does not exist");
    err.status=400;
    return next(err);
  }
  const validPassword = await middleWares.validatePassword(password, user.password);
  if (!validPassword) {
    let err=new Error("invalid password");
    err.status=400;
     return next(err); 
     }
  res.status(200).cookie('token',await middleWares.createToken(user),{httpOnly:true}).send('LoginSuccess');
    }catch(err){
    next(err);
  }
}




