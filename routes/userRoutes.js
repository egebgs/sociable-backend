const express = require('express');
const {registerUser, currentUser, loginUser, updateUser, changeProfilePicture, findUser} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");
const router = express.Router();

const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});

router.post("/findUser",  findUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/current", validateToken,  currentUser);

router.put("/update", validateToken,  updateUser);

router.put("/changeProfilePicture", multerMiddleware.single('file'), validateToken, changeProfilePicture);

module.exports = router;