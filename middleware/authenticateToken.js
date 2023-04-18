const jwt = require('jsonwebtoken');
const secretKey = 'secret_key'
const m = require('..//middleware/authorizeAdmin');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  });
};

const requireUserAuth = (req, res, next) => {
  if (m.authorizeAdmin(req, res).status == 403) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
module.exports = { authenticateToken, requireUserAuth };
