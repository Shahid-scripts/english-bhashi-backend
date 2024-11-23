const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

const addComment = async (req, res) => {
    try {
        const { blogId } = req.params;
        const { content } = req.body;

        const blog = await BlogPost.findById(blogId);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const comment = await Comment.create({ content, author: req.user._id, blogPost: blogId });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const fetchComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blogPost: blogId }).populate('author', 'name');
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addComment, fetchComments };
