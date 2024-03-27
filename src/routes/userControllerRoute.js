import express from 'express';
import * as userController from '../controllers/userController/index.js'
const router=express.Router();
/*
router.get('/getUser',userController.createUser);
router.get('/getAllUsers',userController.getAllUsers);
router.delete('/deleteUser',userController.deleteUser);
router.put('/updateUser',userController.updateUser);
router.post('/createUser',userController.createUser);

*/

router.post('/login',userController.loginUserController);
router.post('/signUp',userController.signUpUserController);
router.post('/forgotPassword',userController.forgotPasswordController);

//router.post('/resetPassword',userController.resetPasswordController);
export default router;