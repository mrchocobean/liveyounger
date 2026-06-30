process.on('uncaughtException', e => console.error('UNCAUGHT:', e));
process.on('unhandledRejection', e => console.error('UNHANDLED:', e));

const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { initDB } = require('./db');
const { PORT } = require('./config');

async function main() {
  console.log('Starting server on port', PORT);
  await initDB();
  console.log('DB initialized');

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/auth', require('./routes/auth'));
  app.use('/api/contact', require('./routes/contact'));
  app.use('/api/analytics', require('./routes/analytics'));

  const publicDir = path.join(__dirname, 'public');
  app.use(express.static(publicDir));

  app.get('/*splat', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(publicDir, 'index.html'));
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log('LiveYounger site running on port', PORT);
  });
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
