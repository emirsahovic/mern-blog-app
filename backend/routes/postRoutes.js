import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', protect, createPost);

export default router;
