import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config({path:"../../.env"});
export const authenticate =async(req, res,next) => {
    const Token = req.cookies.token
    if (!Token) {
      let err = new Error('unauthorised');
      err.status = 401;
      return next(err);
    }
    try {
        const payload=jwt.verify(Token, process.env.PrivateOrSecretKey);
        req.roleData=payload;
        req.authenticated = true;
        return  next()
      }
     catch (err) {
      if (err.name === 'TokenExpiredError') {
        const error = new Error('Session expired. Please log in again.');
        error.status = 401;
        return next(error);
      }
      const error= new Error("Unauthorised"+err.message);
      error.status=401;
      return next(error);
    }
  }
  