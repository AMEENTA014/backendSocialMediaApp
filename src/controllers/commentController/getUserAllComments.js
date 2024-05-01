import * as commentModels from '../../models/commentModels/index.js';
import { Role } from '@prisma/client';
export const getUserAllComment=async(req,res,next)=>{
    const {userId}=req.body;
    if (!userId) {
       userId= req.roleData.userId ;
    }
    try{
        if ((req.roleData.userId !==userId)&&(req.roleData.role!==Role.ADMIN)) {
            const err = new Error('Forbidden');
            err.status = 403;
            return next(err);
        }
        const AllComment=await commentModels.getUserAllCommentModel(userId)
        res.status(200).send(AllComment);
     }catch(err){
        return next(err);
     }
}