const path = require('path');
const fs = require('fs');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, '..', '..', 'data', 'db.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter, {});

async function initDb() {
  await db.read();
  db.data ||= {
    users: [],
    programs: [],
    posts: [],
    events: [],
    partners: [],
    volunteers: [],
    donation_pledges: [],
    contact_messages: [],
    outbox: [],
    _counters: { users: 0, programs: 0, posts: 0, events: 0, partners: 0, volunteers: 0, donation_pledges: 0, contact_messages: 0, outbox: 0 }
  };
  await db.write();
}

// Helper functions to mimic SQL-like operations
function getNextId(table) {
  if (!db.data._counters) {
    db.data._counters = { users: 0, programs: 0, posts: 0, events: 0, partners: 0, volunteers: 0, donation_pledges: 0, contact_messages: 0, outbox: 0 };
  }
  if (!db.data._counters[table]) {
    db.data._counters[table] = 0;
  }
  db.data._counters[table]++;
  return db.data._counters[table];
}

async function insert(table, data) {
  await db.read();
  if (!db.data[table]) {
    db.data[table] = [];
  }
  const id = getNextId(table);
  const record = { id, ...data, created_at: new Date().toISOString() };
  db.data[table].push(record);
  await db.write();
  return record;
}

async function findOne(table, predicate) {
  await db.read();
  if (!db.data[table]) return null;
  return db.data[table].find(predicate);
}

async function findAll(table, predicate = () => true) {
  await db.read();
  if (!db.data[table]) return [];
  return db.data[table].filter(predicate);
}

async function updateOne(table, id, updates) {
  await db.read();
  if (!db.data[table]) return null;
  const index = db.data[table].findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    db.data[table][index] = { ...db.data[table][index], ...updates };
    await db.write();
    return db.data[table][index];
  }
  return null;
}

async function deleteOne(table, id) {
  await db.read();
  if (!db.data[table]) return null;
  const index = db.data[table].findIndex(item => item.id === parseInt(id));
  if (index !== -1) {
    const deleted = db.data[table].splice(index, 1)[0];
    await db.write();
    return deleted;
  }
  return null;
}

async function ensureAdminSeed() {
  await db.read();
  if (!db.data || !db.data.users || db.data.users.length === 0) {
    const email = 'admin@bastikipathshala.local';
    const password = 'admin123';
    const password_hash = bcrypt.hashSync(password, 10);
    insert('users', { email, password_hash, role: 'admin' });
    console.log('\nSeeded admin user.\nEmail: ' + email + '\nPassword: ' + password + '\nPlease change after first login.');
  }
}

// Initialize database on module load
(async () => {
  await initDb();
})();

module.exports = {
  db,
  ensureAdminSeed,
  insert,
  findOne,
  findAll,
  updateOne,
  deleteOne
};

