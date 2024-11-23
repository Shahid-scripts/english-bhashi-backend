const express = require('express');
const bodyParser = require('body-parser');// Midelwares
const dbConnect = require('./utils/dbConnect');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express();

// Connect to the database
dbConnect();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

module.exports = app;
