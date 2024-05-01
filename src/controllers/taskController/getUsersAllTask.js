import { getUsersAllTaskModel,userAllTaskWAAS } from "../../models/taskModels/index.js";
export const getUsersAllTask = async (req, res, next) => {
    try {const {code}=req.body
        const userId=req.roleData.userId;
        const tasks = await getUsersAllTaskModel(userId);
        if (!tasks) {
            const err = new Error('NoTasksFound');
            err.status = 404;
            return next(err);
        }
        if(!code){
            return res.status(200).send(tasks);
        }
        res.status(200).send(await userAllTaskWAAS(userId));
    } catch (err) {
        return next(err);
    }
};