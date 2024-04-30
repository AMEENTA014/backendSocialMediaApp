import express from 'express';
const router=express.Router();
import * as postController from '../controllers/postController/index.js'
import * as middleWares from '../middleWares/index.js';
import { servErr } from './servErr.js';
router.use(servErr);
router.post('/create',middleWares.authenticate,postController.createPostController);
router.put('/update',middleWares.authenticate,postController.updatePostController);
router.delete('/delete',middleWares.authenticate,postController.deletePostController);
router.get('/getUserAllPost',middleWares.authenticate,postController.getUserAllPostController);
router.get('/getAllPost',middleWares.authenticate,postController.getAllPostController);
router.get('/getPost',middleWares.authenticate,postController.getSinglePost);
export default router;
