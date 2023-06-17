const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, "Email already exists"],
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
        unique: [true, "Phone number is already registered"],
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: [true, "Username already exists"],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    }

}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);