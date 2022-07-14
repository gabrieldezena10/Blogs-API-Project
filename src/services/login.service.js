const { createToken } = require('./jwt.service');
const { User } = require('../database/models/index');
const httpStatusCodes = require('../helpers/httpstatusCode');

  const login = async ({ email, password }) => {
    if (!email || !password) {
      const e = new Error('Some required fields are missing');
      e.status = httpStatusCodes.BAD_REQUEST;
      throw e;
    }
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      const e = new Error('Invalid fields');
      e.status = httpStatusCodes.BAD_REQUEST;
      throw e;
    }
    const token = createToken({ email });
    return token;
};

module.exports = {
  login,
};
