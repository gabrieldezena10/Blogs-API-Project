const loginService = require('../services/login.service');
const httpStatusCodes = require('../helpers/httpstatusCode');

const login = async (req, res) => {
    const token = await loginService.login(req.body);
    return res.status(httpStatusCodes.OK).json({ token });
};

module.exports = {
  login,
};