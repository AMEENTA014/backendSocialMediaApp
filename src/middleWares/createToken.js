import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();
 const createToken = (user) => {
    const Token = jwt.sign(
      { username: user.name, id: user.id, role: user.role },
      process.env.PrivateOrSecretKey,
    );
   return Token;
  };
  export default createToken;