const bcrypt = require('bcryptjs');
const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

let db = null;

async function initDB() {
  if (db) return;
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const dbPath = path.join(dataDir, 'ly.db');
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    const buf = fs.readFileSync(dbPath);
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT DEFAULT 'admin',
      created TEXT DEFAULT (datetime('now'))
    )`);
    const hash = bcrypt.hashSync('admin123', 10);
    db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', ['admin@liveyounger.com', hash, 'admin']);
    db.run(`CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, email TEXT, phone TEXT, subject TEXT, message TEXT,
      sms_sent INTEGER DEFAULT 0, sms_error TEXT,
      created TEXT DEFAULT (datetime('now'))
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT, ip TEXT, referrer TEXT, user_agent TEXT,
      created TEXT DEFAULT (datetime('now'))
    )`);
    saveDB();
  }
}

function saveDB() {
  if (!db) return;
  const data = db.export();
  const dbPath = path.join(__dirname, 'data', 'ly.db');
  fs.writeFileSync(dbPath, Buffer.from(data));
}

function getDB() { return db; }

function q(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function x(sql, params = []) {
  db.run(sql, params);
  saveDB();
  return { changes: db.getRowsModified() };
}

function lastId() {
  const r = q('SELECT last_insert_rowid() as id');
  return r.length ? r[0].id : 0;
}

module.exports = { initDB, saveDB, getDB, q, x, lastId };
