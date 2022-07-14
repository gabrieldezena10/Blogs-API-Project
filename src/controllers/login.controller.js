const loginService = require('../services/login.service');
const httpStatusCodes = require('../helpers/httpstatusCode');

const createLogin = async (req, res) => {
    const token = await loginService.createUser(req.body);
    return res.status(httpStatusCodes.OK).send({ token });
};

module.exports = {
  createLogin,
};