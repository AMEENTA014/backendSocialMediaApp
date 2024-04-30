import { getTask2Model,getTaskModel,getTaskWAAS } from "../../models/taskModels/index.js";
export const getTaskController = async (req, res, next) => {
    const { taskId,code} = req.body;
    try {
        const task = await getTaskModel(taskId);
        if (!task) {
            const err = new Error('TaskNotFound');
            err.status = 404;
            return next(err);
        }
     if(code){//code bodyl kodthal WAAS formatted data ayrkkum
        if(task.ownerId===req.roleData.userId){
            res.status(200).send(await getTaskWAAS(taskId));//ownernta formatted data
        }
        res.status(200).send(await getTask2Model(taskId));//other user view a task 
    }
    res.status(200).send(await getTaskModel(taskId));//literally the record of the table task
    } catch (err) {
        return next(err);
    }
};