const userService = require('../services/user.service');
const httpStatusCodes = require('../helpers/httpstatusCode');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);
  return res.status(httpStatusCodes.CREATED).json({ token });
};

module.exports = {
  createUser,
};