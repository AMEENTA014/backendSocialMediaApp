import { Role } from '@prisma/client';
import * as userModels from '../../models/userModels/index.js';
export const deleteUserController = async (req, res, next) => {
    const { userId } = req.body; 
    if (!userId) {
        const err = new Error("UserIdRequired");
        err.status = 400;
        return next(err);
    }
    try {
        if((userId !==req.roleData.userId)&&(req.roleData.role!==Role.ADMIN)){
          const err=new Error('forbidden');
          err.status=403;
          return next(err);
        }
        //ee condition authentication illathappol use cheyyam
        const user = await userModels.getUserModel(userId); 
        if (!user) {
            const err = new Error("UserNotFound");
            err.status = 404;
            return next(err);
        }
        res.status(200).send(await userModels.deleteUserModel(userId));
    } catch (err) {
        return next(err);
    }
};