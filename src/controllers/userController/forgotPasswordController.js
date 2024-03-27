import * as userModels from '../../models/userModels/index.js';
import * as middleWares from '../../middleWares/index.js'
export const forgotPasswordController=async(req, res)=>{
    const {email} = req.body;
    const user = await userModels.getUserByEmailModel({ email });
    if (!user) {
      return res.status(400).send({error: "User does not exist"});
    }
    const resetPassToken=middleWares.generateResetToken();
    // waiting for redis setup userModels.updateUserModel();
    middleWares.sendMail(user,resetPassToken);   
}

