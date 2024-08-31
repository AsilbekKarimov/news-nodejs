const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');


const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createPost = async (req, res) => {
    const post = req.body;

    if (!req.userId) return res.status(401).json({ message: "Unauthenticated" });

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });   
    }
};

const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully." });
}

const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" })

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    try {
        const post = await PostMessage.findById(id);
        if (!post) return res.status(404).send('Post not found');

        const index = post.likes.findIndex((id) => id === String(req.userId))

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(
            id,
            post,
            { new: true }
        );

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = { getPosts, createPost, getPost, updatePost, deletePost, likePost };
