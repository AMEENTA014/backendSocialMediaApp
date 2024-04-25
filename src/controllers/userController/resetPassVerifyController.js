import * as userModels from '../../models/userModels/index.js';
import { getValue, isExpired } from '../../models/redis/redis.js';
import { hashPass } from '../../middleWares/index.js';
import {cacheServerPromise} from '../../main.js';
export const verifyResetPasswordController = async (req, res, next) => {
    const {resetId, newPassword } = req.body;
    
    if (!resetId || !newPassword) {
        const err = new Error("Reset ID, new password?");
        err.status = 400;
        return next(err);
    }
    try {
        if (await isExpired(await cacheServerPromise,resetId)) {
            const err = new Error("Reset link expired");
            err.status = 400;
            return next(err);
        }
        const data = JSON.parse(await getValue(await cacheServerPromise,resetId));
        const updatedUser = await userModels.updateUserModel(data.userId, { password: await hashPass(newPassword) });
        
        res.status(200).send(updatedUser);
    } catch (err) {
        return next(err);
    }
};