const express = require('express');
const { addComment, fetchComments } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:blogId', authMiddleware, addComment);
router.get('/:blogId', fetchComments);

module.exports = router;
