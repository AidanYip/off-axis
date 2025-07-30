const adminService = require("../services/adminService");
const { buildResponse } = require("../helpers/responseHelper");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Artists

const getAllArtists = async (req, res) => {
  try {
    const result = await adminService.getAllArtists();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getAllArtistApplications = async (req, res) => {
  try {
    const result = await adminService.getAllArtistApplications();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArtistById = async (req, res) => {
  try {
    const { artist_id } = req.body;

    if (!artist_id) {
      return res
        .status(400)
        .json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await adminService.getArtistById(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateArtist = async (req, res) => {
  try {
    const { name, town, music_link, mobile_number, genre, links, bio, bank_full_name, bank_account_type, bank_account_number, sort_code, verified, artist_id } = req.body;
    const image_path = path.join('/api/uploads', req.file.filename);

    if (!req.file) return res.status(400).json(buildResponse(false, 400, 'File is null/empty'))
    if (!artist_id || !name || !town || !music_link || !mobile_number || !bank_full_name || !bank_account_type || !bank_account_number || !sort_code) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await adminService.updateArtist({ ...req.body, image_path });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const deleteArtist = async (req, res) => {
  try {
    const { artist_id } = req.body;

    if (!artist_id) {
      return res
        .status(400)
        .json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await adminService.deleteArtist(req.body);

    if (!result || result.affectedRows === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const approveArtist = async (req, res) => {
  try {
    const { artist_id } = req.body;

    if (!artist_id) {
      return res
        .status(400)
        .json(
          buildResponse(
            false,
            400,
            "Missing required fields, got: " + artist_id
          )
        );
    }

    const result = await adminService.approveArtist(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

// Gigs

const getAllUpcomingGigsArtistInfo = async (req, res) => {
  try {
    const result = await adminService.getAllUpcomingGigsArtistInfo();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllGigDraftsArtistInfo = async (req, res) => {
  try {
    const result = await adminService.getAllGigDraftsArtistInfo();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPastGigsArtistInfo = async (req, res) => {
  try {
    const result = await adminService.getAllPastGigsArtistInfo();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGigByGigId = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res
        .status(400)
        .json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await adminService.getGigByGigId(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateGig = async (req, res) => {
  try {
    const { gig_id, venue_id, date, doors_time, description, original_price, tickets_available, verified, gig_name } = req.body;
    const image_path = path.join('/api/uploads', req.file.filename);

    if (!req.file) return res.status(400).json(buildResponse(false, 400, 'File is null/empty'))
    if (!gig_id || !venue_id || !date || !doors_time || !description || !original_price || !tickets_available || !gig_name) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await adminService.updateGig({ ...req.body, image_path });

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const approveGig = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res
        .status(400)
        .json(
          buildResponse(false, 400, "Missing required fields, got: " + gig_id)
        );
    }

    const result = await adminService.approveGig(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const deleteGig = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res
        .status(400)
        .json(
          buildResponse(false, 400, "Missing required fields, got: " + gig_id)
        );
    }

    const result = await adminService.deleteGig(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

// Festivals (Exists as Gig in DB)

const getAllUpcomingFestivals = async (req, res) => {
  try {
    const result = await adminService.getAllUpcomingFestivals();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPastFestivals = async (req, res) => {
  try {
    const result = await adminService.getAllPastFestivals();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFestival = async (req, res) => {
  try {
    const { gig_id, gig_name, verified } = req.body;

    if (!gig_id || !gig_name) {
      return res
        .status(400)
        .json(
          buildResponse(false, 400, "Missing required fields, got: " + gig_id)
        );
    }

    const result = await adminService.updateGig(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const approveFestival = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res
        .status(400)
        .json(
          buildResponse(false, 400, "Missing required fields, got: " + gig_id)
        );
    }

    const result = await adminService.approveGig(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const deleteFestival = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res
        .status(400)
        .json(
          buildResponse(false, 400, "Missing required fields, got: " + gig_id)
        );
    }

    const result = await adminService.deleteGig(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const createFestival = async (req, res) => {
  try {
    const {
      artist_id,
      date,
      doors_time,
      description,
      original_price,
      tickets_available,
      gig_name,
    } = req.body;

    if (
      !artist_id ||
      !date ||
      !doors_time ||
      !description ||
      !original_price ||
      !tickets_available ||
      !gig_name
    ) {
      return res
        .status(400)
        .json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await adminService.createGig(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getFestivalByGigId = async (req, res) => {
  try {
    const { gig_id } = req.body;

    if (!gig_id) {
      return res
        .status(400)
        .json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await adminService.getGigByGigId(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

module.exports = {
  getAllArtists,
  getAllArtistApplications,
  getArtistById,
  updateArtist: [upload.single('image'), updateArtist],
  deleteArtist,
  approveArtist,
  getAllUpcomingGigsArtistInfo,
  getAllGigDraftsArtistInfo,
  getAllPastGigsArtistInfo,
  getGigByGigId,
  updateGig: [upload.single('image'), updateGig],
  approveGig,
  deleteGig,
  getAllUpcomingFestivals,
  getAllPastFestivals,
  updateFestival,
  approveFestival,
  deleteFestival,
  createFestival,
  getFestivalByGigId,
};
