import {getAllUserAppModel} from '../../models/applicationModels/index.js';
import {getUserModel}from '../../models/userModels/index.js';
export const getAllUserAppController=async(req,res,next)=>{
    try{
        const userId=req.roleData.userId;
        //userFound? checking is avoided coz authentication ,user illenkil pass cheyyilla
        res.status(200).send(await getAllUserAppModel(userId));
    }catch(err){return next(err);}
}