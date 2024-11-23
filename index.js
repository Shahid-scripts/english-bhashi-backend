require('dotenv').config();
const app = require('./src/app');

// Use environment variable for the port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
