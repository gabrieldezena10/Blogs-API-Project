require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
  
    return token;
  };

const validateToken = (token) => {
    try {
      if (!token) {
        const e = new Error('Token is missing');
        e.name = 'UnauthorizedError';
        throw e;
      }
      const { data } = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (error) {
      const e = new Error('Expired or invalid token');
      e.name = 'UnauthorizedError';
      throw e;
    }
  };

module.exports = {
  createToken,
  validateToken,
};