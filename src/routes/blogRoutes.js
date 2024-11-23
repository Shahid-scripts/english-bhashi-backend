const express = require('express');
const { createBlog, updateBlog, deleteBlog, fetchBlogs } = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);
router.get('/', fetchBlogs);

module.exports = router;
