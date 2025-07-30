const express = require('express');
const gigController = require('../controllers/gigController');
const router = express.Router();

router.get('/getAllGigs', gigController.getAllGigs);
router.get('/getAllFestivals', gigController.getAllFestivals);
router.post('/getSupportsByGigId', gigController.getSupportsByGigId);
router.post('/getGigByArtistId', gigController.getGigByArtistId);
router.post('/getGigById', gigController.getGigById);
router.post('/getGigByGigId', gigController.getGigByGigId);
router.post('/getTotalPriceOfGigs', gigController.getTotalPriceOfGigs);
router.post('/getGigCartInfo', gigController.getGigCartInfo);
router.post('/getGigsCheckoutInfo', gigController.getGigsCheckoutInfo);
router.post('/createGig', gigController.createGig);
router.post('/updateGig', gigController.updateGig);
router.post('/deleteGig', gigController.deleteGig);
router.post('/setSupport', gigController.setSupport);
router.post('/updateSupport', gigController.updateSupport);
router.post('/getAllSupportRequests', gigController.getAllSupportRequests);

module.exports = router;
