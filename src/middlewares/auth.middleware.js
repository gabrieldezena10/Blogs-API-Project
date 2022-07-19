require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const httpstatusCode = require('../helpers/httpstatusCode');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(httpstatusCode.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.data.email } });

    req.user = user;    
    next();
  } catch (error) {
    return res.status(httpstatusCode.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};
