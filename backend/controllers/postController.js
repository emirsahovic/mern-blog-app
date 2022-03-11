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

// @desc    Get post by id
// @method  GET /api/posts/:postId
// @access  Private
const getPostById = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    res.status(200).json(post);
})

// @desc    Delete post
// @method  DELETE /api/posts/:postId
// @access  Private
const deletePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await post.remove();

    res.status(200).json(post);
})

// @desc    Update post
// @method  PUT /api/posts/:postId
// @access  Private
const updatePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(404);
        throw new Error('Post not found');
    }

    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });

    res.status(200).json(updatedPost);
})

// @route PUT api/posts/like/:postId
// @desc Like a post
// @access Private
const likePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        res.status(400);
        throw new Error('Post already liked');
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.status(200).json(post.likes);
})

// @route PUT api/posts/unlike/:postId
// @desc Unike a post
// @access Private
const unlikePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        res.status(400);
        throw new Error('Post has not yet been liked');
    }

    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.status(200).json(post.likes);
})

export { getPosts, createPost, getPostById, deletePost, updatePost, likePost, unlikePost }
