const express = require('express');
const validateToken = require("../middleware/validateTokenHandler");
const {createPost} = require("../controllers/postController");
const multer = require("multer");
const router = express.Router();

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});

router.post("/create", multerMiddleware.single('file'), validateToken, createPost);
/*router.get("/getAllPosts", validateToken, getAllPosts);
router.get("/getAllPostsOfUser/:userId", validateToken, getAllPostsOfUser);
router.get("/getPostById/:postId", validateToken, getPostById);
router.delete("/deletePostById/:postId", validateToken, deletePostById);
*/

module.exports = router;