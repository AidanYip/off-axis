const express = require('express');
const venueController = require('../controllers/venueController');
const router = express.Router();

router.get('/getAllVenues', venueController.getAllVenues);
router.get('/getAllVenueNames', venueController.getAllVenueNames);
router.post('/getVenueById', venueController.getVenueById);
router.post('/getVenueByGigId', venueController.getVenueByGigId);
router.post('/createVenue', venueController.createVenue);
router.post('/updateVenue', venueController.updateVenue);
router.post('/deleteVenue', venueController.deleteVenue);

module.exports = router;
