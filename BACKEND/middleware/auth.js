// Middleware to protect routes using session-based auth
module.exports = function requireAuth(req, res, next) {
  // DEBUG: log the incoming cookie header and session for diagnosis
  console.log('requireAuth cookies:', req.headers.cookie);
  console.log('requireAuth session:', req.session);

  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};
