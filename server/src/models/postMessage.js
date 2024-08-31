const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    creator: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
    },
    selectedFile: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);


module.exports = PostMessage