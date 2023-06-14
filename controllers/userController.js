const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
//@desc Get all users
//@route GET /api/users
//@access Public

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({users});
});

//@desc Get all users
//@route GET /api/users
//@access Public
const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json({user});
});


//@desc Create user
//@route POST /api/user
//@access
const createUser = asyncHandler(async(req, res) => {

    const{name, email, phone, password} = req.body;
    if(!name || !email || !phone || !password){
        res.status(400);
        throw new Error('Please fill all the fields');
    }
    const user = await User.create({
        name,
        email,
        phone,
        password
    });
    res.status(201).json({user});
});

//@desc Update user by id
//@route PUT /api/user/:id
//@access Public
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error('User not found');
    }
    const updatedUser = User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
    );
    res.status(200).json({updatedUser});
});

//@desc Delete user by id
//@route GET /api/user/:id
//@access Public
const deleteUser = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Delete User route for id: ' + req.params.id});
});


module.exports = {getUsers, createUser, updateUser, deleteUser, getUser};