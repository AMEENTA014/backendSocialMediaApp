import { getRequestModel, getRequestWU, } from "../../models/requestModels/index.js";

export const getPointRequestController = async (req, res, next) => {
    const {code, requestId } = req.body;

    try {
       if(code){
        return res.status(200).send( await getRequestWU(requestId)); 
       }  
        res.status(200).send( await getRequestModel(requestId));
    } catch (err) {
        return next(err);
    }
};