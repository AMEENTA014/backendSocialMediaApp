import {getUserAppModel,userAllAppWTAU} from '../../models/applicationModels/index.js';
export const getUserAppController=async(req,res,next)=>{
    try{
        const {code}=req.body
        const userId=req.roleData.userId;
        //userFound? checking is avoided coz authentication ,user illenkil pass cheyyilla
        if(code){
           return  res.status(200).send(await userAllAppWTAU(userId));
        }
        res.status(200).send(await getUserAppModel(userId));
    }catch(err){return next(err);}
}