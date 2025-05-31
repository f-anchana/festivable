const verifyToken = require('./verifyToken');

function requireOrganizer(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: "Accès réservé aux organizers" });
    }
    next();
  });
}

module.exports = requireOrganizer;