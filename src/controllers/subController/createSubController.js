import { createSubModel, findSubmissionModel } from '../../models/subModels/index.js';
import {getTaskModel,updateTaskModel}from '../../models/taskModels/index.js';
export const createSubController = async (req, res, next) => {
    const { taskId, submissionContent } = req.body;
    const userId = req.roleData.userId;
    
    if (!taskId || !submissionContent) {
        const err = new Error("Missing taskId or submissionContent");
        err.status = 400;
        return next(err);
    }

    try {
        const task = await getTaskModel(taskId);

        if (!task) {
            const err = new Error("Task not found");
            err.status = 404;
            return next(err);
        }

        if ((task.status === 'OPEN')||(task.status==='CLOSED')) {
            const err = new Error("Task is not in progress");
            err.status = 400;
            return next(err);
        }

        if (await findSubmissionModel(userId, taskId)) {
            const err = new Error("User has already submitted");
            err.status = 400;
            return next(err);
        }
        
        const submission = await createSubModel({ userId, taskId, content: submissionContent });
        await updateTaskModel(taskId,{status:'CLOSED'})
        res.status(201).send(submission);
    } catch (err) {
        return next(err);
    }
}