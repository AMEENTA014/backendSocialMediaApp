import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({path:"../../.env"});
export const sendEMail=async(email,subject,message)=>{
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MYMAIL,
      pass: process.env.MAILPASS
    }
  });
  const mailOptions = {
    to: email,
    from: process.env.MYMAIL,
    subject: subject,
    text: message
  };
    return transporter.sendMail(mailOptions)
      .then(() => {
        return {message: 'Reset link sent to your email'};
      })
      .catch(error => {
        throw new Error("error in mailSending" + error.message);
      });
  }