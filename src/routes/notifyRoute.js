import express from 'express';
const router=express.Router();
import * as notifyController from '../controllers/notifyController/index.js';
import * as middleWares from '../middleWares/index.js';
import { servErr } from './servErr.js';
router.use(servErr);
router.get('/getNotifications',middleWares.authenticate,notifyController.getNotifications);
router.put('/update',middleWares.authenticate,notifyController.updateNotify);
export default router;