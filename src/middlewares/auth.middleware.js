require('dotenv').config();
const jwt = require('jsonwebtoken');
const httpstatusCode = require('../helpers/httpstatusCode');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(httpstatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    jwt.verify(authorization, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(httpstatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};
