const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/getAllUsers', userController.getAllUsers);
router.post('/getUserByEmail', userController.getUserByEmail);
router.post('/createUser', userController.createUser);
router.post('/updateUser', userController.updateUser);
router.post('/deleteUser', userController.deleteUser);

module.exports = router;
