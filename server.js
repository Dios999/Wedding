const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DATA_FILE = path.join(__dirname, 'rsvps.json');

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Helper to read existing RSVPs
function readRsvps() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper to save RSVPs
function saveRsvps(rsvps) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2));
}

// API endpoint to receive RSVP data
app.post('/api/rsvp', (req, res) => {
  const rsvps = readRsvps();
  rsvps.push(req.body);
  saveRsvps(rsvps);
  res.json({ success: true });
});

// API endpoint to return all RSVPs (protected by simple query token)
app.get('/api/rsvps', (req, res) => {
  const token = req.query.token;
  const ADMIN_TOKEN = 'dios999';
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const rsvps = readRsvps();
  res.json(rsvps);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
