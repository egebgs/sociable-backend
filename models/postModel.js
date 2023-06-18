const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);

