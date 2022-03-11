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

// @desc    Create post
// @method  POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res, next) => {
    const { text } = req.body;

    if (!text) {
        res.status(400);
        throw new Error('Please provide text for post');
    }

    const user = await User.findById(req.user.id).select('-password');

    const newPost = await Post.create({
        text,
        name: user.name,
        user: req.user.id
    })

    res.status(201).json(newPost);
})

export { getPosts, createPost }