import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3001;

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
