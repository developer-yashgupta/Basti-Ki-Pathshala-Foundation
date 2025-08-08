function requireAuth(role) {
  return (req, res, next) => {
    const user = req.session.user;
    if (!user) return res.redirect('/admin/login');
    if (role && user.role !== role && user.role !== 'admin') return res.status(403).send('Forbidden');
    next();
  };
}

function attachLocals(req, res, next) {
  res.locals.session = req.session;
  res.locals.now = new Date();
  next();
}

module.exports = { requireAuth, attachLocals };

