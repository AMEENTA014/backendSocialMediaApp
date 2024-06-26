import express from 'express';
const router=express.Router();
import * as appController from '../controllers/appController/index.js';
import * as middleWares from '../middleWares/index.js';
import { servErr } from './servErr.js';
router.use(servErr);
router.post('/create',middleWares.authenticate,appController.createAppController);
router.get('/getApp',middleWares.authenticate,appController.getAppController);
router.delete('/delete',middleWares.authenticate,appController.deleteAppController);
router.get('/getTaskApp',middleWares.authenticate,appController.getTaskAppController);
router.get('/getUserApp',middleWares.authenticate,appController.getUserAppController);
router.post('/statusChange',middleWares.authenticate,appController.appStatusChange);
export default router;