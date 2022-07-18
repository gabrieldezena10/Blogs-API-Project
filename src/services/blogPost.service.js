const Joi = require('joi');
const { BlogPost, User, Category } = require('../database/models/index');
const httpStatusCodes = require('../helpers/httpstatusCode');

const validateBody = (data) => {
  const schema = Joi.object({
    title: Joi.string().required().messages({
      'string.required': 'Some required fields are missing',
    }),
    content: Joi.string().required().messages({
      'string.required': 'Some required fields are missing',
    }),
    categoryIds: Joi.required().messages({
      'array.not.empty': '"categoryIds" not found',
    }),
  });
  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
};

const createBlogPost = async (obj) => {
  const validatedData = validateBody(obj);
  const { title } = validatedData;
  if (!title) {
    const e = new Error('Some required fields are missing');
    e.status = httpStatusCodes.BAD_REQUEST;
    throw e;
  }
//   const { count } = await BlogPost.findAndCountAll({
//     include: [{ model: PostCategory, as: 'PostCategory', attributes: { exclude: ['postId'] } }],
//     where: { categoryIds },
// });

  // const result = await BlogPost.create({ title, content, userId, updated, published });
  // return result;
};

const getAll = async () => {
  const data = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return data;
};

const getById = async (id) => {
  const data = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [''] } },
    ],
  });
  return data;
};

module.exports = {
  createBlogPost,
  getAll,
  getById,
};