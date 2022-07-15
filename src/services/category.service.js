const Joi = require('joi');
const { Category } = require('../database/models/index');

const validateBody = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'string.required': '"name" is required',
    }),
  });

  const { error, value } = schema.validate(data);
  if (error) throw error;

  return value;
};

const createCategory = async (obj) => {
  const validatedData = validateBody(obj);
  const { name } = validatedData;

  const result = await Category.create({ name });
  return result;
};

const getAllCategories = async () => {
  const data = await Category.findAll();
  return data;
};

module.exports = {
  createCategory,
  getAllCategories,
};