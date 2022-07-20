const { BlogPost, User, Category, PostCategory } = require('../database/models/index');
const httpStatusCodes = require('../helpers/httpstatusCode');

const createBlogPost = async (title, content, categoryIds, userId) => {
  if (!title || !content || !categoryIds) {
    const e = new Error('Some required fields are missing');
    e.status = httpStatusCodes.BAD_REQUEST;
    throw e;
  }

  const allCategories = await Category.findAll();
  const availableCategoriesIds = allCategories.map((item) => item.id);
  const validCategoryIds = categoryIds.every((catId) => availableCategoriesIds.includes(catId));

  if (validCategoryIds === false) {
    const e = new Error('"categoryIds" not found');
    e.status = httpStatusCodes.BAD_REQUEST;
    throw e;
  }

  const result = await BlogPost
    .create({ title, content, userId, updated: new Date(), published: new Date() });

  await Promise.all(categoryIds.map((catId) => 
    PostCategory.create({ postId: result.dataValues.id, categoryId: catId })));

  return result;
};

const getAll = async () => {
  const data = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      // https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return data;
};

const getById = async (id) => {
  const data = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!data) {
    const e = new Error('Post does not exist');
    e.status = httpStatusCodes.NOT_FOUND;
    throw e;
  }

  return data;
};

const updatePost = async (id, { title, content }, userId) => {
  const authorizedUser = await getById(id);
  if (authorizedUser.user.id !== userId) {
    const e = new Error('Unauthorized user');
    e.status = httpStatusCodes.UNAUTHORIZED;
    throw e;
  }
  if (!title || !content) {
    const e = new Error('Some required fields are missing');
    e.status = httpStatusCodes.BAD_REQUEST;
    throw e;
  }

  await BlogPost.update({ title, content }, { where: { id } });

  return { ...authorizedUser.dataValues, title, content };
};

const destroyPost = async (id, userId) => {
  const post = await getById(id);
  if (post.user.id !== userId) {
    const e = new Error('Unauthorized user');
    e.status = httpStatusCodes.UNAUTHORIZED;
    throw e;
  }

  if (!post) {
    const e = new Error('Post does not exist');
    e.status = httpStatusCodes.NOT_FOUND;
    throw e;
  }
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  createBlogPost,
  getAll,
  getById,
  updatePost,
  destroyPost,
};