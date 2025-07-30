const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/getUpcomingGigs', homeController.getUpcomingGigs);
router.get('/getRecentGigs', homeController.getRecentGigs);
router.get('/getArtistOfTheWeek', homeController.getArtistOfTheWeek);
module.exports = router;
