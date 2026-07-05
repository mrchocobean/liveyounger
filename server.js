process.on('uncaughtException', e => console.error('UNCAUGHT:', e));
process.on('unhandledRejection', e => console.error('UNHANDLED:', e));

const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Contact form endpoint (optional - works if data dir is writable)
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Contact form:', name, email);
    res.json({ ok: true, message: 'Thank you! We will contact you soon.' });
  } catch (err) {
    res.json({ ok: true });
  }
});

// Serve index.html from the same directory (no public/ folder needed)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('LiveYounger site running on port', PORT);
});
