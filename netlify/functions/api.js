const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

// Database setup for read-only API
// Admin features require Express server (npm start)
const dbPath = path.join('/tmp', 'db.json');
let db;

async function initDb() {
  if (!db) {
    const adapter = new JSONFile(dbPath);
    db = new Low(adapter, {});
    await db.read();
    db.data ||= {
      programs: [],
      posts: [],
      events: [],
      partners: [],
      volunteers: [],
      donation_pledges: [],
      contact_messages: []
    };
  }
  return db;
}

async function findAll(table) {
  return db.data[table] ? db.data[table] : [];
}

exports.handler = async (event, context) => {
  await initDb();
  
  const { httpMethod, path: requestPath } = event;
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  
  try {
    const resource = requestPath.replace('/api/', '').split('/')[0];
    
    if (httpMethod === 'GET') {
      switch (resource) {
        case 'programs':
          return { statusCode: 200, headers, body: JSON.stringify(await findAll('programs')) };
        case 'posts':
          return { statusCode: 200, headers, body: JSON.stringify(await findAll('posts')) };
        case 'events':
          return { statusCode: 200, headers, body: JSON.stringify(await findAll('events')) };
        case 'partners':
          return { statusCode: 200, headers, body: JSON.stringify(await findAll('partners')) };
        default:
          return { statusCode: 404, headers, body: JSON.stringify({ error: 'Not found' }) };
      }
    }
    
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (error) {
    console.error('API Error:', error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Internal server error' }) };
  }
};