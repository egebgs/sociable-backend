const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
//@desc Register a user
//@route POST /api/user/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {

    const {username, password} = req.body;
    if(!username || !password){
        res.status(400);
        throw new Error("Please enter all fields");

    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPassword,
    });

    if(user){
        res.status(201).json(user);
        
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc Login a user
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const user = await User.findOne({username});
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({
            user: {
                username: user.username,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET );
        res.status(200).json({token,username});

    }
    else{
        res.status(401);
        throw new Error("Invalid username or password");
    }
});


//@desc Retrieve current user info
//@route POST /api/user/current
//@access Public

//@desc Retrieve current user info
//@route POST /api/user/current
//@access Public
const currentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if(user){
        res.json(user);
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
});


const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedUser);
});


module.exports = {registerUser, currentUser, loginUser, updateUser};