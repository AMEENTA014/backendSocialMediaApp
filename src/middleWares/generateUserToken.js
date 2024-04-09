import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config({path:"../../.env"});
 export const createToken =async(user) => {
    const Token = jwt.sign(
      { username: user.userName, userId: user.userId, role: user.role },
      process.env.PrivateOrSecretKey,{expiresIn:'1h'}
    );
   return Token;
  };
  
