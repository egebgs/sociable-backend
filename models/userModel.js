const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please enter your username'],
        unique: [true, "Username already exists"],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    profilePicture: {
        type: String,
    }

}, {
    timestamps: true,
});

userSchema.index({ username: 'text' });

module.exports = mongoose.model('User', userSchema);