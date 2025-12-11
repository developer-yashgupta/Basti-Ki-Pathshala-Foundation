const path = require('path');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const bcrypt = require('bcrypt');

// Database setup for Netlify Functions
const dbPath = path.join('/tmp', 'db.json');
let db;

async function initDb() {
  if (!db) {
    const adapter = new JSONFile(dbPath);
    db = new Low(adapter, {});
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
    
    // Ensure admin user exists
    if (db.data.users.length === 0) {
      const email = 'admin@bastikipathshala.org';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const password_hash = bcrypt.hashSync(password, 10);
      db.data.users.push({
        id: 1,
        email,
        password_hash,
        role: 'admin',
        created_at: new Date().toISOString()
      });
      db.data._counters.users = 1;
      await db.write();
    }
  }
  return db;
}

// Helper functions
function getNextId(table) {
  if (!db.data._counters[table]) {
    db.data._counters[table] = 0;
  }
  db.data._counters[table]++;
  return db.data._counters[table];
}

async function insert(table, data) {
  const id = getNextId(table);
  const record = { id, ...data, created_at: new Date().toISOString() };
  db.data[table].push(record);
  await db.write();
  return record;
}

async function findAll(table, predicate = () => true) {
  return db.data[table] ? db.data[table].filter(predicate) : [];
}

async function findOne(table, predicate) {
  return db.data[table] ? db.data[table].find(predicate) : null;
}

exports.handler = async (event, context) => {
  // Initialize database
  await initDb();
  
  const { httpMethod, path: requestPath, body, queryStringParameters } = event;
  
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  
  try {
    const pathSegments = requestPath.replace('/api/', '').split('/');
    const resource = pathSegments[0];
    const id = pathSegments[1];
    
    switch (resource) {
      case 'programs':
        if (httpMethod === 'GET') {
          const programs = await findAll('programs');
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(programs)
          };
        }
        if (httpMethod === 'POST') {
          const data = JSON.parse(body);
          const program = await insert('programs', data);
          return {
            statusCode: 201,
            headers,
            body: JSON.stringify(program)
          };
        }
        break;
        
      case 'posts':
        if (httpMethod === 'GET') {
          const posts = await findAll('posts');
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(posts)
          };
        }
        break;
        
      case 'events':
        if (httpMethod === 'GET') {
          const events = await findAll('events');
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(events)
          };
        }
        break;
        
      case 'partners':
        if (httpMethod === 'GET') {
          const partners = await findAll('partners');
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(partners)
          };
        }
        break;
        
      case 'contact':
        if (httpMethod === 'POST') {
          const data = JSON.parse(body);
          const message = await insert('contact_messages', data);
          return {
            statusCode: 201,
            headers,
            body: JSON.stringify({ success: true, message: 'Message sent successfully' })
          };
        }
        break;
        
      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Not found' })
        };
    }
    
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
    
  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};