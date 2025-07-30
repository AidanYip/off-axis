const venueService = require('../services/venueService');
const { buildResponse } = require('../helpers/responseHelper');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const getAllVenues = async (req, res) => {
  try {
    const result = await venueService.getAllVenues();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getAllVenueNames = async (req, res) => {
  try {
    const result = await venueService.getAllVenueNames();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getVenueById = async (req, res) => {
  try {
    const { venue_id } = req.body;

    if (!venue_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await venueService.getVenueById(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const getVenueByGigId = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing gig_id"));
    }

    const result = await venueService.getVenueByGigId(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const createVenue = async (req, res) => {
  try {
    const { venue_name, venue_capacity, venue_city, venue_address, venue_link, description } = req.body;
    const image_path = path.join('/api/uploads', req.file.filename);

    if (!req.file) return res.status(400).json(buildResponse(false, 400, 'File is null/empty'))
    if ( !venue_name || !venue_capacity || !venue_city || !venue_address || !venue_link || !description) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await venueService.createVenue({ ...req.body, image_path });

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateVenue = async (req, res) => {
  try {
    const { venue_id, venue_name, venue_capacity, venue_address, venue_link, description, is_festival, verified } = req.body;

    if ( !venue_id || !venue_name || !venue_capacity || !venue_address || !venue_link || !description) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await venueService.updateVenue(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const deleteVenue = async (req, res) => {
  try {
    const { venue_id } = req.body;

    if (!venue_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await venueService.deleteVenue(req.body);

    if (!result || result.affectedRows === 0){
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

module.exports = {
  getAllVenues,
  getAllVenueNames,
  getVenueById,
  getVenueByGigId,
  createVenue: [upload.single('image'), createVenue],
  updateVenue,
  deleteVenue
};