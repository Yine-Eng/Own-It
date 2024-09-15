const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(cors()); // Enable CORS for all routes

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve `index.html` when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to serve the API key
app.get('/api/google-maps-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});