const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        blogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
