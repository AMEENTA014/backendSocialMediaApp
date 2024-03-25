import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const validateToken = (req, res) => {
    const Token = req.cookies['token'];
  
    if (!Token) {
      return res.status(400).json({ error: 'not authenticated' });
    }
  
    try {
      const validatedToken = jwt.verify(Token, process.env.privateOrSecretKey);
      if (validatedToken) {
        req.authenticated = true;
        return next();
      } else {
        return res.status(401).json({ error: 'not authorized' });
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  };
  export default validateToken;