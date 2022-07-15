const express = require('express');
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
 
const router = express.Router();

router.post('/', authMiddleware, categoryController.createCategory);
router.get('/', authMiddleware, categoryController.getAllCategories);

module.exports = router;