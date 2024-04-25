import { OAuth2Client } from 'google-auth-library';
import * as userModels from '../../models/userModels/index.js';
import * as middleWares from '../../middleWares/index.js'
import { prisma } from '../../models/prisma.js';
import dotenv from 'dotenv';
dotenv.config({path:"../../../.env"});
import  { setExpire, setValue } from '../../models/redis/redis.js';
import { cacheServerPromise } from '../../main.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignInController = async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) {
    const err = new Error("ID token is required");
    err.status = 400;
    return next(err);
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name: username, sub: googleId } = ticket.getPayload();

    let user = await userModels.getUserByEmailModel(email);
    if (!user) {
      user = await prisma.user.create({data:{ email:email, userName:username, googleId:googleId }});
    }
    res.status(200).cookie('token',await middleWares.createToken(user),{httpOnly:true}).send('LoginSuccess');
  } catch (error) {
    return next(error);
  }
};