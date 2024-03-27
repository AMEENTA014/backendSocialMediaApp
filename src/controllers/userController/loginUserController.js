import * as userModels from '../../models/userModels/index.js';
import * as middleWares from '../../middleWares/index.js';

export const loginUserController=async(req,res)=>{
      let  {email,password}=req.body;
      
      if (!email || !password) {
        return res.status(400).send({error: "Both email and password are required"});
      }
      
      const user = await userModels.getUserByEmailModel( email );
  if (!user) {
    return res.status(400).send({error: "User does not exist"});
  }


  const validPassword = await middleWares.validatePassword(password, user.password);
  if (!validPassword) {
    return res.status(400).send({error: "Invalid password"});
  }
  res.status(200).cookie('token',middleWares.createToken(user),{httpOnly:true}).send('success');
}




