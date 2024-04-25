import { setValue, setExpire } from '../../models/redis/redis.js';
import { generateUniqueId, sendEMail } from '../../middleWares/index.js';
import { cacheServerPromise } from '../../main.js';
import { getUserModel} from '../../models/userModels/index.js';
export const resetPassWordController = async (req, res, next) => {
    const { email } = req.body;
    if (!email ) {
        const err = new Error("Email  required");
        err.status = 400;
        return next(err);
    }
    try {
      const userId=req.roleData.userId;
      const user=await getUserModel(userId);
      if((user.email!==email)){
        const err = new Error("forbidden");
            err.status = 403;
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