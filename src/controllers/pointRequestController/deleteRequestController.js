import { AppStatus, Role } from '@prisma/client';
import {deleteRequestModel,getRequestModel}from '../../models/requestModels/index.js';
export const deleteRequestController = async (req, res, next) => {
    const { requestId } = req.body;
    const userId=req.roleData.userId;
    if(!requestId){
        const err=new Error("noRequestIdprovided");
        err.status=400;
        return next(err);
    }
    try {
        const request = await getRequestModel(requestId);
        if (!request) {
            return res.status(404).send({ message: 'Request not found' });
        }
        if((req.roleData.role==='USER')&&(request.status!==AppStatus.APPLIED)){
            const err=new Error("forbiddenCantDeleteUnPendingRequests");
            err.status=403;
            return next(err);
        }
        if(req.roleData.role===Role.ADMIN){
            await deleteRequestModel(requestId);
           return  res.status(200).send({message:`requestDeletedBy${req.roleData.role}`});
        }
        if((request.userId!==userId)){
        const err=new Error("forbidden");
        err.status=403;
        return next(err);
        }
        await deleteRequestModel(requestId);
        res.status(200).send({message:`requestDeletedBy${req.roleData.role}`});
        
    } catch (err) {
        return next(err);
    }
};