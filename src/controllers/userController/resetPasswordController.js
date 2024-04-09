import { setValue, setExpire } from '../../models/redis/redis.js';
import { generateUniqueId, sendEMail } from '../../middleWares/index.js';
import { cacheServerPromise } from '../../main.js';
import { getUserByEmailModel } from '../../models/userModels/getUserByEmailModel.js';
export const resetPassWordController = async (req, res, next) => {
    const { email,userId } = req.body;
    if (!email || !userId) {
        const err = new Error("Email and userID is required");
        err.status = 400;
        return next(err);
    }
      if(userId!==req.roleData.userId)
      {
        const err=new Error("forbidden");
        err.status=403;
        return next(err);
      }
    try {
      if(!(await getUserByEmailModel(email))){
        const err = new Error("User with this email does not exist");
            err.status = 404;
            return next(err);
      }
        const resetId = await generateUniqueId();
        await setValue(await cacheServerPromise,resetId, JSON.stringify({ userId }));
        await setExpire(await cacheServerPromise,resetId, 600);
        const resetLink = `${process.env.RESETLINK}/id=${resetId}`;
        const message= `Click this link to reset your password: ${resetLink}`;
        res.status(200).send(await sendEMail(email,'resetPass',message));
    } catch (err) {
        return next(err);
    }
};