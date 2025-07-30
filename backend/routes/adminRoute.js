const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Artists
router.get('/getAllArtists', adminController.getAllArtists);
router.get('/getAllArtistApplications', adminController.getAllArtistApplications);
router.post('/getArtistById', adminController.getArtistById);
router.post('/updateArtist', adminController.updateArtist);
router.post('/deleteArtist', adminController.deleteArtist);
router.post('/approveArtist', adminController.approveArtist);

// Gigs
router.get('/getAllUpcomingGigsArtistInfo', adminController.getAllUpcomingGigsArtistInfo);
router.get('/getAllGigDraftsArtistInfo', adminController.getAllGigDraftsArtistInfo);
router.get('/getAllPastGigsArtistInfo', adminController.getAllPastGigsArtistInfo);
router.post('/getGigByGigId', adminController.getGigByGigId);
router.post('/updateGig', adminController.updateGig);
router.post('/approveGig', adminController.approveGig);
router.post('/deleteGig', adminController.deleteGig);

// Festivals (Exists as Gig in DB)
router.get('/getAllUpcomingFestivals', adminController.getAllUpcomingFestivals);
router.get('/getAllPastFestivals', adminController.getAllPastFestivals);
router.post('/updateFestival', adminController.updateFestival);
router.post('/approveFestival', adminController.approveFestival);
router.post('/deleteFestival', adminController.deleteFestival);
router.post('/createFestival', adminController.createFestival);
router.post('/getFestivalByGigId', adminController.getFestivalByGigId);

module.exports = router;