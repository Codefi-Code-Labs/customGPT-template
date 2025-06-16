const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Simple in-memory store (replace with a database for production)
const memory = {};

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/savememory', (req, res) => {
  const { key, value } = req.body;
  if (!key || !value) {
    return res.status(400).json({ error: 'Missing key or value' });
  }
  memory[key] = value; // Save in memory (use DB for persistence)
  res.json({ status: 'success', key, value });
});

// GET /getmemory?key=yourKey
app.get('/getmemory', (req, res) => {
  const { key } = req.query;
  if (!key) {
    return res.status(400).json({ error: 'Missing key' });
  }
  if (!(key in memory)) {
    return res.status(404).json({ error: 'Key not found' });
  }
  res.json({ key, value: memory[key] });
});


app.listen(3000, () => {
  console.log('Memory API running on http://localhost:3000');
});
