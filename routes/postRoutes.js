const express = require('express');
const validateToken = require("../middleware/validateTokenHandler");
const {createPost, getAllPosts, getAllPostsOfUser, getPostById, deletePostById} = require("../controllers/postController");
const multer = require("multer");
const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});


router.post("/create", upload.single("filename"),validateToken, createPost);
router.get("/getAllPosts", validateToken, getAllPosts);
router.get("/getAllPostsOfUser/:userId", validateToken, getAllPostsOfUser);
router.get("/getPostById/:postId", validateToken, getPostById);
router.delete("/deletePostById/:postId", validateToken, deletePostById);

module.exports = router;