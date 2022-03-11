import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import Post from '../models/postModel.js';

// @desc    Get all posts
// @method  GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().populate('user', ['name', 'email']);
    res.status(200).json(posts);
})

export { getPosts }