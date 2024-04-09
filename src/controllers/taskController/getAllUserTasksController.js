import {getAllUserTasksModel} from '../../models/taskModels/index.js';
export const getAllUsersTasksController = async (req, res, next) => {
    try {
        res.status(200).send(await getAllUserTasksModel());
    } catch (err) {
        return next(err);
    }
};