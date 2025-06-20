const verifyToken = require('./verifyToken');

function requireAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Accès réservé aux admins" });
    }
    next();
  });
}

module.exports = requireAdmin;