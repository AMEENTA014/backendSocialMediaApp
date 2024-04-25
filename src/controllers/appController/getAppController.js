import {getAppModel} from "../../models/applicationModels/index.js";
export const getAppController = async (req, res, next) => {
    const { appId } = req.body;
    try {
        const app = await getAppModel(appId);
        if (!app) {
            const err = new Error('applicationNotfound');
            err.status = 404;
            return next(err);
        }
        res.status(200).send(app);
    } catch (err) {
        return next(err);
    }
};