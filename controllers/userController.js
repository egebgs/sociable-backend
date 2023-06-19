const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const {Storage} = require("@google-cloud/storage");
const {firebaseConfig} = require("../config/firebaseConfig");
const Post = require("../models/postModel");
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
                username: user.username,
                id: user.id
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
    const sameUsername = await User.findOne({username: req.body.username});
    if(sameUsername){
        res.status(400);
        throw new Error("Username already exists");
    }
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedUser);
});

const changeProfilePicture = asyncHandler(async (req, res, next) => {
    const storage = new Storage({
        projectId: firebaseConfig.projectId,
        keyFilename: './config/socialize-f4439-firebase-adminsdk-a8fgi-b17c1d771c.json' // Your service account key file path
    });

    const bucket = storage.bucket('gs://socialize-f4439.appspot.com');

    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    const blob = bucket.file(`pfp${Date.now()}${req.user.id}${req.file.originalname}`);;
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
        console.error(err);
        next(err);
    });

    blobStream.on('finish', async () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        const user = await User.findById(req.user.id);
        user.profilePicture = publicUrl;
        user.save();
        res.status(200).json(user);


    });

    blobStream.end(req.file.buffer);
});

const findUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({username:req.body.username});
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json(user);
});

module.exports = {registerUser, currentUser, loginUser, updateUser, changeProfilePicture, findUser};