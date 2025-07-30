const gigService = require('../services/gigService');
const { buildResponse } = require('../helpers/responseHelper');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const getAllGigs = async (req, res) => {
  try {
    const result = await gigService.getAllGigs();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getAllFestivals = async (req, res) => {
  try {
    const result = await gigService.getAllFestivals();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getAllGigsArtistInfo = async (req, res) => {
  try {
    const result = await gigService.getAllGigsArtistInfo();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllGigDrafts = async (req, res) => {
  try {
    const result = await gigService.getAllGigDrafts();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupportsByGigId = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required field"));
    }

    const result = await gigService.getSupportsByGigId(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const getGigByArtistId = async (req, res) => {
  try {
    const { artist_id } = req.body;

    if (!artist_id ) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.getGigByArtistId(req.body);

    if (!result) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const getGigById = async (req, res) => {
  try {
    const { venue_id, artist_id, gig_id } = req.body;

    if (!venue_id || !artist_id || !gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.getGigById(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const getGigByGigId = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.getGigByGigId(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const getTotalPriceOfGigs = async (req, res) => {
  try {
    const { gig_ids } = req.body;

    if (!gig_ids) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.getTotalPriceOfGigs(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const getGigCartInfo = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.getGigCartInfo(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const getGigsCheckoutInfo = async (req, res) => {
  try {
    const { gig_ids } = req.body;

    if (!gig_ids) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.getGigsCheckoutInfo(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const createGig = async (req, res) => {
  try {
    const { artist_id, venue_id, date, doors_time, description, original_price, tickets_available, gig_name } = req.body;
    const image_path = path.join('/api/uploads', req.file.filename);

    if (!req.file) return res.status(400).json(buildResponse(false, 400, 'File is null/empty'))
    if (!artist_id || !venue_id || !date || !doors_time || !description || !original_price || !tickets_available || !gig_name) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.createGig({ ...req.body, image_path });

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateGig = async (req, res) => {
  try {
    const { gig_id, venue_id, date, doors_time, description, original_price, tickets_available, gig_name, supports } = req.body;
    const image_path = path.join('/api/uploads', req.file.filename);

    if (!req.file) return res.status(400).json(buildResponse(false, 400, 'File is null/empty'))
    if (!gig_id || !venue_id || !date || !doors_time || !description || !original_price || !tickets_available || !gig_name) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.updateGig({ ...req.body, image_path });
    if (supports) {
      const result2 = await gigService.setSupport(req.body);
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const deleteGig = async (req, res) => {
  try {
    const { venue_id, artist_id, gig_id } = req.body;

    if (!venue_id || !artist_id || !gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.deleteGig(req.body);

    if (!result || result.affectedRows === 0){
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const setSupport = async (req, res) => {
  try {
    const { artist_id, gig_id } = req.body;

    if (!artist_id || !gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.setSupport(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateSupport = async (req, res) => {
  try {
    const { artist_id, gig_id } = req.body;

    if (!artist_id || !gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await gigService.updateSupport(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getAllSupportRequests = async (req, res) => {
  try {
    const { artist_id } = req.body;

    if (!artist_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required field"));
    }

    const result = await gigService.getAllSupportRequests(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

module.exports = {
  getAllGigs,
  getGigById,
  getGigByGigId,
  getGigByArtistId,
  getTotalPriceOfGigs,
  getGigCartInfo,
  getGigsCheckoutInfo,
  createGig: [upload.single('image'), createGig],
  updateGig: [upload.single('image'), updateGig],
  deleteGig,
  getAllFestivals,
  getSupportsByGigId,
  setSupport,
  updateSupport,
  getAllSupportRequests,
};
