const express = require('express');
const router = express.Router();
const {getUsers, createUser, deleteUser, updateUser, getUser} = require('../controllers/userController');

router.route("/user/").get(getUsers);

router.route("/user/").post(createUser);

router.route("/user/:id").put(updateUser);

router.route("/user/:id").delete(deleteUser);

router.route("/user/:id").get(getUser);

module.exports = router;