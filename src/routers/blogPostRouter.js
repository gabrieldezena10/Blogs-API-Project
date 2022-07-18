const express = require('express');
const blogPostController = require('../controllers/blogPost.controller');
const authMiddleware = require('../middlewares/auth.middleware');
 
const router = express.Router();

router.post('/', authMiddleware, blogPostController.createPost);
router.get('/', authMiddleware, blogPostController.getAll);
router.get('/:id', authMiddleware, blogPostController.getById);

module.exports = router;