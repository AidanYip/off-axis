const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/getCredentials', authController.getCredentials);
router.get('/verify', verifyToken, authController.verify);
router.get('/verifyAdmin', verifyToken, authController.verifyAdmin);
router.post('/checkEmail', authController.checkEmail);

module.exports = router;
