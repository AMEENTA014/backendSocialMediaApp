import {createUserModel,getUserByEmailModel} from '../../models/userModel';

import bcrypt from 'bcrypt';
export async function signUpUserController(req,res) {
      let  {email,username,password}=req.body;
      if (!email || !username || !password) {
        return res.status(400).send({error: "All fields are required"});
      }


      const existingUser = getUserByEmailModel({ email });
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
      const user = await createUserModel.create(userData);
      res.status(201).send(user);
    } catch(error) {
      res.status(500).send({error:"error "});
    }
  
  }