require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect = () => {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
        console.error('DB_URL is missing in the environment variables.');
        process.exit(1); // Exit the application if DB_URL is not defined
    }

    mongoose
        .connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connected to MongoDB successfully'))
        .catch((err) => {
            console.error('MongoDB connection failed:', err.message);
            process.exit(1); // Exit the app if the connection fails
        });
};

module.exports = dbConnect;
