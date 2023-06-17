const express = require('express');
const {registerUser, currentUser, loginUser, updateUser} = require("../controllers/userController");
const validateToken = require("../controllers/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);


router.post("/login", loginUser);

router.post("/current", validateToken,  currentUser);

router.put("/update", validateToken,  updateUser);

module.exports = router;