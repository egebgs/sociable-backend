const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Please enter your phone number'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);