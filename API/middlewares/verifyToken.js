const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // extrait le token "Bearer xxx"

  if (!token) return res.status(401).json({ message: "Token manquant" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide" });

    req.user = user; // ajoute les infos utilisateur dans la requête
    next(); // laisse passer la requête vers le contrôleur suivant
  });
}

module.exports = verifyToken;