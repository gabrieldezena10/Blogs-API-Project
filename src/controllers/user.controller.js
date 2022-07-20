const userService = require('../services/user.service');
const httpStatusCode = require('../helpers/httpstatusCode');

const createUser = async (req, res) => {
  const token = await userService.createUser(req.body);
  return res.status(httpStatusCode.CREATED).json({ token });
};

const getUsers = async (_req, res) => {
  const result = await userService.getAll();
  return res.status(httpStatusCode.OK).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await userService.getById(id);
  return res.status(httpStatusCode.OK).json(result);
};

const destroyUser = async (req, res) => {
  const userId = req.user.id;
  await userService.destroyUser(userId);
  return res.status(httpStatusCode.NO_CONTENT).end();
};

module.exports = {
  createUser,
  getUsers,
  getById,
  destroyUser,
};