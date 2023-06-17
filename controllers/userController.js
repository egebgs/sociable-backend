const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
//@desc Register a user
//@route POST /api/user/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {

    const {username, email, phone, password} = req.body;
    if(!username || !email || !phone || !password){
        res.status(400);
        throw new Error("Please enter all fields");

    }
    const [userAvailableForEmail, userAvailableForPhone] = await Promise.all([
        User.findOne({email}),
        User.findOne({phone}),
    ]);

    if(userAvailableForEmail || userAvailableForPhone){
        res.status(400);
        throw new Error("User already exists");
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        phone,
        password: hashedPassword,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            email: user.email,
        });
        
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc Login a user
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        res.status(200).json({accessToken});

    }
    else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});


//@desc Retrieve current user info
//@route POST /api/user/current
//@access Public

const currentUser = asyncHandler(async (req, res) => {
    res.json({message: "Current user info"});
}); 


module.exports = {registerUser, currentUser, loginUser};