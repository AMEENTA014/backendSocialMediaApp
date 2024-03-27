import * as userModels from '../../models/userModels/index.js';

import bcrypt from 'bcrypt';
export const signUpUserController=async(req,res)=>{
     let  {email,username,password}=req.body;
      if (!email || !username || !password) {
        return res.status(400).send({error: "All fields are requied"});
      }


      const existingUser = await userModels.getUserByEmailModel( email );
      if (existingUser) {
        return res.status(400).send({error: "User already exists"});
      }

      const userName=username;
      password=await bcrypt.hash(password, 10);
      const userData=
      {
        email,
        userName,
        password
     }
     try {
      const user = await userModels.createUserModel(userData);
      res.status(201).send(user);
    } catch(error) {
      res.status(500).send({error:"error and error "});
    }
  }