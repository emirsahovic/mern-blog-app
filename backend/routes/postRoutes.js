import express from "express";
import { createPost, getPostById, getPosts } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);
router.get('/:postId', protect, getPostById);

export default router;
