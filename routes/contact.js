const express = require('express');
const { q, x, lastId } = require('../db');

const router = express.Router();

// POST /api/contact
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  x(
    'INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone || null, subject || null, message]
  );
  const id = lastId();
  res.json({ ok: true, id });
});

// GET /api/contact — list messages (admin)
router.get('/', (req, res) => {
  const messages = q('SELECT * FROM messages ORDER BY created DESC');
  res.json(messages);
});

// DELETE /api/contact/:id — delete a message (admin)
router.delete('/:id', (req, res) => {
  x('DELETE FROM messages WHERE id = ?', [req.params.id]);
  res.json({ ok: true });
});

module.exports = router;
