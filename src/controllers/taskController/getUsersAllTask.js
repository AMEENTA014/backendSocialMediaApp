import { getUsersAllTaskModel } from "../../models/taskModels/getUsersAllTaskModel.js";
export const getUsersAllTask = async (req, res, next) => {
    try {
        const userId=req.roleData.userId;
        const tasks = await getUsersAllTaskModel(userId);
        if (!tasks) {
            const err = new Error('NoTasksFound');
            err.status = 404;
            return next(err);
        }
        res.status(200).send(tasks);
    } catch (err) {
        return next(err);
    }
};