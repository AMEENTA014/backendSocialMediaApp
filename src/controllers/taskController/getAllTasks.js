import {getAllTaskModel} from '../../models/taskModels/index.js';
export const getAllTasks = async (req, res, next) => {
    try {
        res.status(200).send(await getAllTaskModel());
    } catch (err) {
        return next(err);
    }
};