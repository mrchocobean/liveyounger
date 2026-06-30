const express = require('express');
const { q, x } = require('../db');

const router = express.Router();

// POST /api/analytics — record a page view
router.post('/', (req, res) => {
  const { path } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || null;
  const referrer = req.headers['referer'] || null;
  const user_agent = req.headers['user-agent'] || null;

  x(
    'INSERT INTO analytics (path, ip, referrer, user_agent) VALUES (?, ?, ?, ?)',
    [path || '/', ip, referrer, user_agent]
  );
  res.json({ ok: true });
});

// GET /api/analytics — retrieve page view data (admin)
router.get('/', (req, res) => {
  const rows = q('SELECT * FROM analytics ORDER BY created DESC LIMIT 1000');
  res.json(rows);
});

module.exports = router;
