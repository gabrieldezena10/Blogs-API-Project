const categoryService = require('../services/category.service');
const httpstatusCode = require('../helpers/httpstatusCode');

const createCategory = async (req, res) => {
  const result = await categoryService.createCategory(req.body);
  return res.status(httpstatusCode.CREATED).json(result);
};

module.exports = {
  createCategory,
};