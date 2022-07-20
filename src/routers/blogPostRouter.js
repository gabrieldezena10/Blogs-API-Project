const express = require('express');
const blogPostController = require('../controllers/blogPost.controller');
const authMiddleware = require('../middlewares/auth.middleware');
 
const router = express.Router();

router.post('/', authMiddleware, blogPostController.createPost);
router.get('/', authMiddleware, blogPostController.getAll);
router.get('/search', authMiddleware, blogPostController.getBySearchTerm);
router.get('/:id', authMiddleware, blogPostController.getById);
router.put('/:id', authMiddleware, blogPostController.updatePost);
router.delete('/:id', authMiddleware, blogPostController.destroyPost);

module.exports = router;