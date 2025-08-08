// Basti Ki Pathshala Foundation – Local-only full-stack site
// Express + EJS + SQLite (better-sqlite3)

const path = require('path');
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const morgan = require('morgan');
const helmet = require('helmet');
const { marked } = require('marked');

const { db, ensureAdminSeed } = require('./lib/db');
const { attachLocals } = require('./lib/middleware');

const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

const app = express();
// Ensure required directories exist
const dataDir = path.join(__dirname, '..', 'data');
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const PORT = process.env.PORT || 3000;

// Security & basics
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Sessions (MemoryStore for simplicity; swap to SQLite store later if needed)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-this-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax' },
  })
);

// Static files
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

// Views
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Locals (flash-like messaging)
app.use(attachLocals);

// Routes
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).render('errors/404', { title: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('errors/500', { title: 'Server Error' });
});

async function startServer() {
  await ensureAdminSeed();
  app.listen(PORT, () => {
    console.log(`Basti Ki Pathshala site running at http://localhost:${PORT}`);
  });
}

startServer();

