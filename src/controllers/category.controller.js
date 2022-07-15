const categoryService = require('../services/category.service');
const httpstatusCode = require('../helpers/httpstatusCode');

const createCategory = async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  return res.status(httpstatusCode.CREATED).json(result);
};

const getAllCategories = async (req, res) => {
  const data = await categoryService.getAllCategories();
  return res.status(httpstatusCode.OK).json(data);
};

module.exports = {
  createCategory,
  getAllCategories,
};