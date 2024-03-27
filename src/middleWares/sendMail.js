import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
export const sendMail=(user,token)=>{
    const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MYMAIL,
      pass: process.env.PASS
    }
  });
  const mailOptions = {
    to: user.email,
    from: process.env.MYMAIL,
    subject: 'Password Reset',
    text: `${process.env.LINKFORRESET}/${token}`
  };

transporter.sendMail(mailOptions, function(err) {
if (err) {
  return res.status(500).send({error: 'Failed to send email'});
}

res.status(200).send({message: 'Reset link sent to your email'});
});
}
