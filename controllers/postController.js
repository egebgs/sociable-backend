const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");
const User = require("../models/userModel");

//@desc Create a post
//@route POST /api/post/create
//@access Private

const createPost = asyncHandler(async (req, res) => {
    const {content} = req.body;
    if(!content){
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const post = await Post.create({
        content,
        userId: req.user._id,
    });
    if(post){
        res.status(201).json({
            _id: post._id,
            content: post.content,
            userId: post.userId,
            createdOn: post.createdOn,
        });
    }else{
        res.status(400);
        throw new Error("Invalid post data");
    }
});

//@desc Get all posts
//@route GET /api/post/getAllPosts
//@access Private

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({createdOn: -1});
    if(posts){
        res.status(200).json(posts);
    }else {
        res.status(400);
        throw new Error("No posts found");
    }
});

//@desc Get all posts of a user
//@route GET /api/post/getAllPostsOfUser/:userId
//@access Private

const getAllPostsOfUser = asyncHandler(async (req, res) => {
    const posts = await Post.find({userId: req.params.userId}).sort({createdOn: -1});
    if(posts){
        res.status(200).json(posts);
    }else {
        res.status(400);
        throw new Error("No posts found");
    }
}

//@desc Get a post by id
//@route GET /api/post/getPostById/:id
//@access Private

const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(post){
        res.status(200).json(post);
    }else {
        res.status(400);
        throw new Error("No post found");
    }
});