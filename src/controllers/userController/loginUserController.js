import {createUserModel,getUserByEmailModel} from '../../models/userModel';
import createToken from '../../middleWares/createToken';
import bcrypt from 'bcrypt';
export async function loginUserController(req,res) {
      let  {email,password}=req.body;
      
      if (!email || !password) {
        return res.status(400).send({error: "Both email and password are required"});
      }
      
      const user = await getUserByEmailModel({ email });
  if (!user) {
    return res.status(400).send({error: "User does not exist"});
  }


  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send({error: "Invalid password"});
  }
  
  res.status(200).json({token:createToken(user)});


}



