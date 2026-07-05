process.on('uncaughtException', e => console.error('UNCAUGHT:', e));
process.on('unhandledRejection', e => console.error('UNHANDLED:', e));

const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const PORT = process.env.PORT || 10000;

async function main() {
  console.log('Starting LiveYounger server on port', PORT);

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Simple contact form storage (JSON file - works on Railway)
  const dataDir = process.env.RAILWAY_VOLUME_MOUNT_PATH || path.join(__dirname, 'data');
  try { fs.mkdirSync(dataDir, { recursive: true }); } catch(e) {}

  // Contact form endpoint
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ ok: false, error: 'Missing required fields' });
      }
      const entry = {
        name, email, phone: phone || '', subject: subject || '', message,
        created: new Date().toISOString()
      };
      const messagesFile = path.join(dataDir, 'messages.json');
      let messages = [];
      try {
        messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
      } catch(e) {}
      messages.push(entry);
      fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
      console.log('Contact form submission from:', email);
      res.json({ ok: true, message: 'Thank you! We will contact you soon.' });
    } catch (err) {
      console.error('Contact error:', err);
      res.status(500).json({ ok: false, error: 'Server error' });
    }
  });

  // Simple analytics endpoint
  app.post('/api/analytics', (req, res) => {
    try {
      const { path: pagePath, referrer, user_agent } = req.body;
      const entry = { path: pagePath, referrer: referrer || '', user_agent: user_agent || '', created: new Date().toISOString() };
      const analyticsFile = path.join(dataDir, 'analytics.json');
      let analytics = [];
      try {
        analytics = JSON.parse(fs.readFileSync(analyticsFile, 'utf8'));
      } catch(e) {}
      analytics.push(entry);
      // Keep only last 1000 entries
      if (analytics.length > 1000) analytics = analytics.slice(-1000);
      fs.writeFileSync(analyticsFile, JSON.stringify(analytics, null, 2));
      res.json({ ok: true });
    } catch (err) {
      console.error('Analytics error:', err);
      res.json({ ok: true }); // don't block user for analytics errors
    }
  });

  // Serve static files
  const publicDir = path.join(__dirname, 'public');
  app.use(express.static(publicDir));

  // SPA fallback - serve index.html for all non-API routes
  app.get('/*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(publicDir, 'index.html'));
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log('LiveYounger site running on port', PORT);
    console.log('Data directory:', dataDir);
  });
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
