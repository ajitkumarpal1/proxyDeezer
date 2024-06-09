import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3001;
// Middleware to set CORS headers
app.use((req, res, next) => {
    // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // Allow specific HTTP headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Allow credentials
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Proceed to the next middleware
    next();
  });
app.get('/chart', async (req, res) => {
  try {
    const response = await fetch('https://api.deezer.com/chart');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching music data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
