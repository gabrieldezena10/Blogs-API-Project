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

module.exports = {
  createToken,
};