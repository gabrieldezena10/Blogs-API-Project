const blogPostService = require('../services/blogPost.service');
const httpstatusCode = require('../helpers/httpstatusCode');

const createPost = async (req, res) => {
  const data = await blogPostService.createBlogPost(req.body);
  return res.httpstatusCode(httpstatusCode.CREATED).json(data);
};

const getAll = async (req, res) => {
  const data = await blogPostService.getAll();
  return res.status(httpstatusCode.OK).json(data);
};

const getById = async (req, res) => {
  const { id } = req.body;
  const data = await blogPostService.getById(id);
  return res.status(httpstatusCode.OK).json(data);
};

module.exports = {
  createPost,
  getAll,
  getById,
};