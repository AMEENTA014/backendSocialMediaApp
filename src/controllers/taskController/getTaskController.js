import { getTaskModel } from "../../models/taskModels/index.js";
export const getTaskController = async (req, res, next) => {
    const { taskId } = req.body;
    try {
        const task = await getTaskModel(taskId);
        if (!task) {
            const err = new Error('TaskNotFound');
            err.status = 404;
            return next(err);
        }
        res.status(200).send(task);
    } catch (err) {
        return next(err);
    }
};