const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Enable CORS for the route

// Serve the API key
app.get('/', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

module.exports = app;