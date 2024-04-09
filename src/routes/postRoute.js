import express from 'express';
const router=express.Router();
import * as postController from '../controllers/postController/index.js'
import * as middleWares from '../middleWares/index.js';
import { servErr } from './servErr.js';
router.use(servErr);
router.post('/createPost',middleWares.authenticate,postController.createPostController);
router.put('/updatePost',middleWares.authenticate,postController.updatePostController);
router.delete('/deletePost',middleWares.authenticate,postController.deletePostController);
router.get('/getAllUsersPost',middleWares.authenticate,postController.getAllUsersPostController);
router.get('/getAllPost/:userId',middleWares.authenticate,postController.getAllPostController);
export default router;
