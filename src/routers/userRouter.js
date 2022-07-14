const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authMiddleware, userController.getUsers);
router.get('/:id', authMiddleware, userController.getById);

module.exports = router;