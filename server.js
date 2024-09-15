const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(express.static('public'));

// Endpoint to serve the API key
app.get('/api/google-maps-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});