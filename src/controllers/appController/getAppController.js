import {getAppModel,getAppWTAU} from "../../models/applicationModels/index.js";
export const getAppController = async (req, res, next) => {
    const { appId,code } = req.body;
    try {
        const app = await getAppModel(appId);
        if (!app) {
            const err = new Error('applicationNotfound');
            err.status = 404;
            return next(err);
        }
        if(code){
            return res.status(200).send( res.status(200).send(await getAppWTAU(appId)));
        }
        res.status(200).send(app);
    } catch (err) {
        return next(err);
    }
};