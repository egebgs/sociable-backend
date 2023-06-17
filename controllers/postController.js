const Post = require("../models/postModel");
const firebase = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");

// Create a new Post
exports.createPost = async (req, res) => {
    const { content, user_id} = req.body;
    if(!content || !user_id){
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try{
        const storageRef = ref(storage, `files/${req.content.originalname + Date.now()}`);
        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        const post = await Post.create({
            content: downloadURL,
            user_id,
            createdOn: Date.now()
        });
        return res.status(201).json({ post });

    }catch (err){
        res.status(400).json({ message: err.message });
    }

};


// Get all Posts of a User
exports.getAllPostsOfUser = async (req, res) => {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    return res.status(200).json({ posts });
};

// Get a Post by id
exports.getPostById = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ post });
};

// Delete a Post by id
exports.deletePostById = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findByIdAndRemove(postId);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ message: 'Post deleted successfully' });
};
