const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

const createBlog = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const blog = await BlogPost.create({ title, content, tags, author: req.user._id });
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        Object.assign(blog, req.body);
        await blog.save();
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        if (req.user.role !== 'Admin' && blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await blog.deleteOne();
        res.status(200).json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const fetchBlogs = async (req, res) => {
    try {
        const { page = 1, tags } = req.query;
        const filter = tags ? { tags: { $in: tags.split(',') } } : {};
        const blogs = await BlogPost.find(filter)
            .populate('author', 'name')
            .skip((page - 1) * 10)
            .limit(10)
            .lean();

        for (const blog of blogs) {
            blog.commentsCount = await Comment.countDocuments({ blogPost: blog._id });
        }

        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createBlog, updateBlog, deleteBlog, fetchBlogs };
