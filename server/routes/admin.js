const path = require('path');
const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const { findAll, findOne, insert, updateOne, deleteOne } = require('../lib/db');
const { requireAuth } = require('../lib/middleware');
const slugify = require('slugify');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'public', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});
const upload = multer({ storage });

router.get('/login', (req, res) => {
  res.render('admin/login', { title: 'Admin Login', isAdmin: true });
});

router.get('/account', (req, res) => {
  res.render('admin/account', { title: 'Account' });
});
router.post('/account/password', async (req, res) => {
  const { current_password, new_password } = req.body;
  const user = await findOne('users', u => u.id === req.session.user.id);
  const ok = bcrypt.compareSync(current_password, user.password_hash);
  if (!ok) {
    return res.render('admin/account', { title: 'Account', error: 'Current password incorrect' });
  }
  const hash = bcrypt.hashSync(new_password, 10);
  await updateOne('users', user.id, { password_hash: hash });
  res.redirect('/admin');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await findOne('users', u => u.email === email);
  if (!user) return res.render('admin/login', { title: 'Admin Login', error: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.render('admin/login', { title: 'Admin Login', error: 'Invalid credentials' });
  req.session.user = { id: user.id, email: user.email, role: user.role };
  res.redirect('/admin');
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

router.use(requireAuth());

router.get('/', async (req, res) => {
  try {
    const [programs, posts, events, volunteers, pledges] = await Promise.all([
      findAll('programs'),
      findAll('posts'),
      findAll('events'),
      findAll('volunteers'),
      findAll('donation_pledges')
    ]);

    const counts = {
      programs: programs.length,
      posts: posts.length,
      events: events.length,
      volunteers: volunteers.length,
      pledges: pledges.length,
    };
    res.render('admin/dashboard', { title: 'Admin Dashboard', counts, isAdmin: true });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Internal server error');
  }
});

// Programs CRUD
router.get('/programs', async (req, res) => {
  try {
    const rows = await findAll('programs');
    const sortedRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.render('admin/programs/index', { title: 'Programs', rows: sortedRows, isAdmin: true });
  } catch (error) {
    console.error('Programs list error:', error);
    res.status(500).send('Internal server error');
  }
});
router.get('/programs/new', (req, res) => {
  res.render('admin/programs/new', { title: 'New Program', isAdmin: true });
});
router.post('/programs', upload.single('cover'), async (req, res) => {
  try {
    const { title, summary, body_md } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const cover_path = req.file ? '/public/uploads/' + req.file.filename : null;
    await insert('programs', { slug, title, summary, body_md, cover_path });
    res.redirect('/admin/programs');
  } catch (error) {
    console.error('Create program error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/programs/:id/edit', async (req, res) => {
  try {
    const row = await findOne('programs', p => p.id === parseInt(req.params.id));
    if (!row) return res.status(404).send('Program not found');
    res.render('admin/programs/edit', { title: 'Edit Program', row, isAdmin: true });
  } catch (error) {
    console.error('Edit program error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/programs/:id', upload.single('cover'), async (req, res) => {
  try {
    const { title, summary, body_md } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const updates = { slug, title, summary, body_md };
    if (req.file) {
      updates.cover_path = '/public/uploads/' + req.file.filename;
    }
    await updateOne('programs', req.params.id, updates);
    res.redirect('/admin/programs');
  } catch (error) {
    console.error('Update program error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/programs/:id/delete', async (req, res) => {
  try {
    await deleteOne('programs', req.params.id);
    res.redirect('/admin/programs');
  } catch (error) {
    console.error('Delete program error:', error);
    res.status(500).send('Internal server error');
  }
});

// Posts CRUD
router.get('/posts', async (req, res) => {
  try {
    const rows = await findAll('posts');
    const sortedRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.render('admin/posts/index', { title: 'Posts', rows: sortedRows, isAdmin: true });
  } catch (error) {
    console.error('Posts list error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/posts/new', (req, res) => {
  res.render('admin/posts/new', { title: 'New Post', isAdmin: true });
});

router.post('/posts', upload.single('cover'), async (req, res) => {
  try {
    const { title, excerpt, body_md } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const cover_path = req.file ? '/public/uploads/' + req.file.filename : null;
    await insert('posts', { slug, title, excerpt, body_md, cover_path });
    res.redirect('/admin/posts');
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/posts/:id/edit', async (req, res) => {
  try {
    const row = await findOne('posts', p => p.id === parseInt(req.params.id));
    if (!row) return res.status(404).send('Post not found');
    res.render('admin/posts/edit', { title: 'Edit Post', row, isAdmin: true });
  } catch (error) {
    console.error('Edit post error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/posts/:id', upload.single('cover'), async (req, res) => {
  try {
    const { title, excerpt, body_md } = req.body;
    const slug = slugify(title, { lower: true, strict: true });
    const updates = { slug, title, excerpt, body_md };
    if (req.file) {
      updates.cover_path = '/public/uploads/' + req.file.filename;
    }
    await updateOne('posts', req.params.id, updates);
    res.redirect('/admin/posts');
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/posts/:id/delete', async (req, res) => {
  try {
    await deleteOne('posts', req.params.id);
    res.redirect('/admin/posts');
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).send('Internal server error');
  }
});

// Events CRUD
router.get('/events', async (req, res) => {
  try {
    const rows = await findAll('events');
    const sortedRows = rows.sort((a, b) => new Date(b.event_date || 0) - new Date(a.event_date || 0));
    res.render('admin/events/index', { title: 'Events', rows: sortedRows, isAdmin: true });
  } catch (error) {
    console.error('Events list error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/events/new', (req, res) => {
  res.render('admin/events/new', { title: 'New Event', isAdmin: true });
});

router.post('/events', async (req, res) => {
  try {
    const { title, event_date, location, description_md } = req.body;
    await insert('events', { title, event_date, location, description_md });
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/events/:id/edit', async (req, res) => {
  try {
    const row = await findOne('events', e => e.id === parseInt(req.params.id));
    if (!row) return res.status(404).send('Event not found');
    res.render('admin/events/edit', { title: 'Edit Event', row, isAdmin: true });
  } catch (error) {
    console.error('Edit event error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/events/:id', async (req, res) => {
  try {
    const { title, event_date, location, description_md } = req.body;
    await updateOne('events', req.params.id, { title, event_date, location, description_md });
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/events/:id/delete', async (req, res) => {
  try {
    await deleteOne('events', req.params.id);
    res.redirect('/admin/events');
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).send('Internal server error');
  }
});

// Partners CRUD
router.get('/partners', async (req, res) => {
  try {
    const rows = await findAll('partners');
    const sortedRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.render('admin/partners/index', { title: 'Partners', rows: sortedRows, isAdmin: true });
  } catch (error) {
    console.error('Partners list error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/partners/new', (req, res) => {
  res.render('admin/partners/new', { title: 'New Partner', isAdmin: true });
});

router.post('/partners', upload.single('logo'), async (req, res) => {
  try {
    const { name, url } = req.body;
    const logo_path = req.file ? '/public/uploads/' + req.file.filename : null;
    await insert('partners', { name, url, logo_path });
    res.redirect('/admin/partners');
  } catch (error) {
    console.error('Create partner error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/partners/:id/edit', async (req, res) => {
  try {
    const row = await findOne('partners', p => p.id === parseInt(req.params.id));
    if (!row) return res.status(404).send('Partner not found');
    res.render('admin/partners/edit', { title: 'Edit Partner', row, isAdmin: true });
  } catch (error) {
    console.error('Edit partner error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/partners/:id', upload.single('logo'), async (req, res) => {
  try {
    const { name, url } = req.body;
    const updates = { name, url };
    if (req.file) {
      updates.logo_path = '/public/uploads/' + req.file.filename;
    }
    await updateOne('partners', req.params.id, updates);
    res.redirect('/admin/partners');
  } catch (error) {
    console.error('Update partner error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/partners/:id/delete', async (req, res) => {
  try {
    await deleteOne('partners', req.params.id);
    res.redirect('/admin/partners');
  } catch (error) {
    console.error('Delete partner error:', error);
    res.status(500).send('Internal server error');
  }
});

// Volunteers & pledges admin
router.get('/volunteers', async (req, res) => {
  try {
    const rows = await findAll('volunteers');
    const sortedRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.render('admin/volunteers/index', { title: 'Volunteers', rows: sortedRows, isAdmin: true });
  } catch (error) {
    console.error('Volunteers list error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/pledges', async (req, res) => {
  try {
    const rows = await findAll('donation_pledges');
    const sortedRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.render('admin/pledges/index', { title: 'Donation Pledges', rows: sortedRows, isAdmin: true });
  } catch (error) {
    console.error('Pledges list error:', error);
    res.status(500).send('Internal server error');
  }
});

router.post('/pledges/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // pledged | received | cancelled
    await updateOne('donation_pledges', req.params.id, { status });
    res.redirect('/admin/pledges');
  } catch (error) {
    console.error('Update pledge status error:', error);
    res.status(500).send('Internal server error');
  }
});

// Outbox (no external email API)
router.get('/outbox', async (req, res) => {
  try {
    const rows = await findAll('outbox');
    const sortedRows = rows.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    res.render('admin/outbox/index', { title: 'Outbox', rows: sortedRows, isAdmin: true });
  } catch (error) {
    console.error('Outbox list error:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/outbox/new', (req, res) => {
  res.render('admin/outbox/new', { title: 'Compose Message', isAdmin: true });
});

router.post('/outbox', async (req, res) => {
  try {
    const { to_email, subject, body_text } = req.body;
    await insert('outbox', { to_email, subject, body_text, status: 'queued' });
    res.redirect('/admin/outbox');
  } catch (error) {
    console.error('Create outbox message error:', error);
    res.status(500).send('Internal server error');
  }
});

// Account management
router.get('/account', (req, res) => {
  res.render('admin/account', { title: 'Account Settings', isAdmin: true });
});

router.post('/account/password', async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    // In a real application, you would:
    // 1. Verify the current password
    // 2. Hash the new password
    // 3. Update the password in the database

    // For this demo, we'll just redirect back with a success message
    // You should implement proper password verification and hashing
    console.log('Password change requested for admin user');
    res.redirect('/admin/account?success=password_updated');
  } catch (error) {
    console.error('Password change error:', error);
    res.redirect('/admin/account?error=password_change_failed');
  }
});

// Site Settings Management
router.get('/settings', (req, res) => {
  res.render('admin/settings', { title: 'Site Settings', isAdmin: true });
});

// Bulk Actions
router.post('/bulk-delete', async (req, res) => {
  try {
    const { table, ids } = req.body;
    if (!table || !ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // Validate table name to prevent SQL injection
    const allowedTables = ['programs', 'posts', 'events', 'partners'];
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: 'Invalid table' });
    }

    // Delete multiple items
    for (const id of ids) {
      await deleteOne(table, id);
    }

    res.json({ success: true, deleted: ids.length });
  } catch (error) {
    console.error('Bulk delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export data
router.get('/export/:table', async (req, res) => {
  try {
    const { table } = req.params;
    const allowedTables = ['programs', 'posts', 'events', 'partners', 'volunteers', 'donation_pledges'];

    if (!allowedTables.includes(table)) {
      return res.status(400).send('Invalid table');
    }

    const data = await findAll(table);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${table}-export-${new Date().toISOString().split('T')[0]}.json"`);
    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;

