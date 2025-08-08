const express = require('express');
const { marked } = require('marked');

const { findAll, findOne, insert } = require('../lib/db');
const slugify = require('slugify');

const router = express.Router();

router.get('/', async (req, res) => {
  const programs = (await findAll('programs')).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
  const posts = (await findAll('posts')).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
  res.render('public/home', { title: 'Basti Ki Pathshala', programs, posts });
});

router.get('/about', (req, res) => {
  res.render('public/about', { title: 'About Us' });
});

router.get('/programs', async (req, res) => {
  const rows = (await findAll('programs')).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.render('public/programs', { title: 'Programs', rows });
});

router.get('/programs/:slug', async (req, res) => {
  const row = await findOne('programs', p => p.slug === req.params.slug);
  if (!row) return res.status(404).render('errors/404', { title: 'Not Found' });
  const rowWithHtml = { ...row, body_html: row.body_md ? marked.parse(row.body_md) : '' };
  res.render('public/program-detail', { title: row.title, row: rowWithHtml });
});

router.get('/stories', async (req, res) => {
  const rows = (await findAll('posts')).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.render('public/stories', { title: 'Stories', rows });
});

router.get('/stories/:slug', async (req, res) => {
  const row = await findOne('posts', p => p.slug === req.params.slug);
  if (!row) return res.status(404).render('errors/404', { title: 'Not Found' });
  const rowWithHtml = { ...row, body_html: row.body_md ? marked.parse(row.body_md) : '' };
  res.render('public/story-detail', { title: row.title, row: rowWithHtml });
});

router.get('/events', async (req, res) => {
  const rows = (await findAll('events')).sort((a, b) => new Date(b.event_date || 0) - new Date(a.event_date || 0));
  res.render('public/events', { title: 'Events', rows });
});

router.get('/partners', async (req, res) => {
  const rows = (await findAll('partners')).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  res.render('public/partners', { title: 'Partners', rows });
});

router.get('/transparency', (req, res) => {
  res.render('public/transparency', { title: 'Transparency' });
});

router.get('/contact', (req, res) => {
  res.render('public/contact', { title: 'Contact' });
});

router.post('/volunteer', async (req, res) => {
  const { name, email, phone, interests, message } = req.body;
  await insert('volunteers', { name, email, phone, interests, message });
  res.redirect('/thank-you');
});

router.post('/donate', async (req, res) => {
  const { name, email, phone, amount, message } = req.body;
  await insert('donation_pledges', { name, email, phone, amount: parseInt(amount || '0', 10), message, status: 'pledged' });
  res.redirect('/thank-you');
});

router.post('/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;
  await insert('contact_messages', { name, email, phone, message });
  res.redirect('/thank-you');
});

router.get('/thank-you', (req, res) => {
  res.render('public/thank-you', { title: 'Thank you' });
});

module.exports = router;

