import { getAllTasksModel } from "../../models/taskModels/getAllTask.js";
export const getAllTasksController = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const tasks = await getAllTasksModel(userId);
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