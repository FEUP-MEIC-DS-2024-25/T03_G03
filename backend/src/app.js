const express = require('express');
const promptRoutes = require('./routes/geminiRoutes');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../..', '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', promptRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
