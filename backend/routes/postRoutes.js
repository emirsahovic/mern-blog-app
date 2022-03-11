import express from "express";
import { createPost, deletePost, getPostById, getPosts } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);
router.get('/:postId', protect, getPostById);
router.delete('/:postId', protect, deletePost);

export default router;
