const express = require('express')
const router = express.Router();
const { getPosts, createPost, getPost, updatePost, deletePost, likePost } = require('../controllers/posts')

router.get('/', getPosts)
router.post('/', createPost)
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);







module.exports = router;
