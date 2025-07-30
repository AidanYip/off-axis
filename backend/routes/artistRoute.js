const express = require('express');
const artistController = require('../controllers/artistController');
const router = express.Router();

router.get('/getAllArtists', artistController.getAllArtists);
router.get('/getAllArtistIds', artistController.getAllArtistIds);
router.post('/getArtistById', artistController.getArtistById);
router.post('/getArtistIdByUserId', artistController.getArtistIdByUserId);
router.post('/createArtist', artistController.createArtist);
router.post('/updateArtist', artistController.updateArtist);
router.post('/deleteArtist', artistController.deleteArtist);
router.post('/registerArtist', artistController.registerArtist);

module.exports = router;
