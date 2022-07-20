const blogPostService = require('../services/blogPost.service');
const httpstatusCode = require('../helpers/httpstatusCode');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  // const { id } = req.user.dataValues;
   const { id } = req.user;

  const data = await blogPostService
  .createBlogPost(title, content, categoryIds, id);
  return res.status(httpstatusCode.CREATED).json(data);
};

const getAll = async (req, res) => {
  const data = await blogPostService.getAll();
  return res.status(httpstatusCode.OK).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const data = await blogPostService.getById(id);
  return res.status(httpstatusCode.OK).json(data);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;
  const data = await blogPostService.updatePost(id, { title, content }, userId);
  return res.status(httpstatusCode.OK).json(data); 
};

const destroyPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  await blogPostService.destroyPost(id, userId);
  return res.status(httpstatusCode.NO_CONTENT).end();
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  destroyPost,
};