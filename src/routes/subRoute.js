import express from 'express';
const router=express.Router();
import * as subController from '../controllers/subController/index.js'
import * as middleWares from '../middleWares/index.js';
import { servErr } from './servErr.js';
router.use(servErr);
router.post('/create',middleWares.authenticate,subController.createSubController);
export default router;