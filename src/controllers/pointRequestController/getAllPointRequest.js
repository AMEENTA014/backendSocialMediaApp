import {getAllRequestModel,getAllRequestWU}from '../../models/requestModels/index.js';
export const getAllPointRequest = async (req, res, next) => {
    const {code}=req.body;
    try {
        if(!code){
           return  res.status(200).send(await getAllRequestModel());
        }
        res.status(200).send(await getAllRequestWU());
    } catch (err) {
        return next(err);
    }
};