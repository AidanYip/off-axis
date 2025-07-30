const artistService = require('../services/artistService');
const { buildResponse } = require('../helpers/responseHelper');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

const getAllArtists = async (req, res) => {
  try {
    const result = await artistService.getAllArtists();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getAllArtistIds = async (req, res) => {
  try {
    const result = await artistService.getAllArtistIds();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getArtistById = async (req, res) => {
  try {
    const { artist_id } = req.body;

    if (!artist_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await artistService.getArtistById(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const getArtistIdByUserId = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await artistService.getArtistIdByUserId(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const createArtist = async (req, res) => {
  try {
    const { is_festival, name, bio, links, credits, genre, sort_code, account_number, account_name, verified } = req.body;

    if (!name || !bio || !links || !credits || !genre || !sort_code || !account_number || !account_name) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await artistService.createArtist(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateArtist = async (req, res) => {
  try {
    const { name, town, music_link, mobile_number, genre, links, bio, bank_full_name, bank_account_type, bank_account_number, sort_code, artist_id } = req.body;
    const image_path = path.join('/api/uploads', req.file.filename);

    if (!req.file) return res.status(400).json(buildResponse(false, 400, 'File is null/empty'))
    if (!artist_id || !name || !town || !music_link || !mobile_number || !bank_full_name || !bank_account_type || !bank_account_number || !sort_code) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await artistService.updateArtist({ ...req.body, image_path });

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
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await artistService.deleteArtist(req.body);

    if (!result || result.affectedRows === 0){
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const registerArtist = async (req, res) => {
  try {
    const { user_id, name, town, music_link, mobile_number, genre, links, first_headline_gig, need_help_booking, bio, bank_full_name, bank_account_type, bank_account_number, sort_code } = req.body;
    const image_path = path.join('/api/uploads', req.file.filename);

    if (!req.file) return res.status(400).json(buildResponse(false, 400, 'File is null/empty'))
    if (!user_id || !name || !town || !music_link || !mobile_number || !bank_full_name || !bank_account_type || !bank_account_number || !sort_code) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await artistService.registerArtist({ ...req.body, image_path });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json(buildResponse(false, 404, "Failed to register artist"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

module.exports = {
  getAllArtists,
  getAllArtistIds,
  getArtistById,
  getArtistIdByUserId,
  createArtist,
  updateArtist: [upload.single('image'), updateArtist],
  deleteArtist,
  registerArtist: [upload.single('image'), registerArtist]
};
