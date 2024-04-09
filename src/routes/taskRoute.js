import express from 'express';
const router=express.Router();
import * as taskController from '../controllers/TaskController/index.js'
import * as middleWares from '../middleWares/index.js';
import { servErr } from './servErr.js';
router.use(servErr);
router.post('/createTask',middleWares.authenticate,taskController.createTaskController);
router.put('/updateTask',middleWares.authenticate,taskController.updateTaskController);
router.delete('/deleteTask/:userId/:taskId',middleWares.authenticate,taskController.deleteTaskController);
router.get('/getAllUsersTask',middleWares.authenticate,taskController.getAllUsersTasksController);
router.get('/getAllTask/:userId',middleWares.authenticate,taskController.getAllTasksController)
router.get('/getTask/:taskId',middleWares.authenticate,taskController.getTaskController);
export default router;