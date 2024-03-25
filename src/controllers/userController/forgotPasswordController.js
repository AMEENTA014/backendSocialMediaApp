import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {getUserByEmailModel,updateUserModel} from '../../models/userModel';
import bcrypt from 'bcrypt';
dotenv.config();

export async function forgotPasswordController(req, res) {
    const {email} = req.body;
  
   
    const user = await getUserByEmailModel({ email });
    if (!user) {
      return res.status(400).send({error: "User does not exist"});
    }








    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.pass
        }
      });



      const mailOptions = {
        to: user.email,
        from: '',
        subject: 'Password Reset',
        text: 'helloBro'
      };
    

}