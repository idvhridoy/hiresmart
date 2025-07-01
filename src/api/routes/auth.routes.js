const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const { authLimiter } = require('../../config/rateLimit');

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', authLimiter, AuthController.login);

module.exports = router;
