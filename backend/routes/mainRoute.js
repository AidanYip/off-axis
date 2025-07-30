const express = require('express');
const mainController = require('../controllers/mainController');
const router = express.Router();

router.post('/createTable', mainController.createTable);
router.post('/mockPopulateTable', mainController.mockPopulateTable);
router.post('/uploadImage', mainController.uploadImage);

module.exports = router;
