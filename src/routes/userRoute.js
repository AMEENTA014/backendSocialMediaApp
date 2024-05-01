import express from 'express';
const router = express.Router();

import * as userController from '../controllers/userController/index.js';
import * as middleWares from '../middleWares/index.js';
import { servErr } from './servErr.js';

router.use(servErr);
router.post('/logout',middleWares.authenticate,userController.logoutUserController)
router.post('/gSignIn',userController.googleSignInController);
router.get('/getUserData',middleWares.authenticate,userController.getUserData);
router.get('/getUserProfile',middleWares.authenticate,userController.getUserProfile);
router.get('/getAll',middleWares.authenticate,userController.getAllUserController);
router.post('/signUp', userController.signUpUserController);
router.post('/login', userController.loginUserController);
router.post('/forgotPassword', userController.forgotPasswordController);
router.post('/verify', userController.verifyController);
router.post('/resetPassword', middleWares.authenticate, userController.resetPassWordController);
router.post('/resetPassVerify', userController.verifyResetPasswordController);
router.put('/update', middleWares.authenticate, userController.updateUserController);
router.delete('/delete',middleWares.authenticate,userController.deleteUserController);
router.get('/leaderBoard',middleWares.authenticate,userController.getLeaderBoard);
export default router;