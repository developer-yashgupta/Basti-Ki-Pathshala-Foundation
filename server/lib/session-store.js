const session = require('express-session');
const path = require('path');
const { db } = require('./db');

/**
 * Custom Session Store using lowdb
 * Persists sessions to the database for production use (Render, etc)
 */
class LowDBSessionStore extends session.Store {
  constructor() {
    super();
    this.initSessions();
  }

  initSessions() {
    if (!db.data.sessions) {
      db.data.sessions = {};
      db.write();
    }
  }

  get(sid, callback) {
    try {
      if (!this.initCheck()) {
        return callback(null, undefined);
      }
      const session = db.data.sessions[sid];
      callback(null, session || null);
    } catch (err) {
      callback(err);
    }
  }

  set(sid, session, callback) {
    try {
      if (!this.initCheck()) {
        return callback(null);
      }
      db.data.sessions[sid] = session;
      db.write();
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  destroy(sid, callback) {
    try {
      if (!this.initCheck()) {
        return callback(null);
      }
      delete db.data.sessions[sid];
      db.write();
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  touch(sid, session, callback) {
    try {
      if (!this.initCheck()) {
        return callback(null);
      }
      db.data.sessions[sid] = session;
      db.write();
      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  initCheck() {
    if (!db.data.sessions) {
      db.data.sessions = {};
      db.write();
    }
    return true;
  }
}

module.exports = LowDBSessionStore;
