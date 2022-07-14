const Joi = require('joi');
const { User } = require('../database/models/index');
const httpStatusCodes = require('../helpers/httpstatusCode');
const { createToken } = require('./jwt.service');

const validateBody = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
};

const createUser = async (obj) => {
  const validatedData = validateBody(obj);
  const { displayName, email, password, image } = validatedData;
  const emailAlreadyExists = await User.findOne({ where: { email } });
  if (emailAlreadyExists) {
    const e = new Error('User already registered');
    e.status = httpStatusCodes.CONFLICT;
    throw e;
  }

  await User.create({ displayName, email, password, image });

  const token = createToken({ displayName, email, image });
  return token;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getById = async (id) => {
  // const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) {
    const e = new Error('User does not exist');
    e.status = httpStatusCodes.NOT_FOUND;
    throw e;
  }
  return user;
};

module.exports = {
  createUser,
  getAll,
  getById,
};