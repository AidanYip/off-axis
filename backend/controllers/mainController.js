const mainService = require('../services/mainService');
const { buildResponse } = require('../helpers/responseHelper');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage }).single('file');

const uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    const { model, model_id } = req.body;
    const tableMap = { artist: 'artist', gig: 'gig', venue: 'venue', ticket: 'ticket' };
    
    if (!tableMap[model.toLowerCase()]) return res.status(400).json(buildResponse(false, 400, "Model is incorrect or it is not a part of database"));
    if (!model || !model_id) return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    if (!req.file) return res.status(400).json(buildResponse(false, 400, 'File is null/empty'))
    if (err) return res.status(500).json(buildResponse(false, 500, 'File upload failed', err));

    const imagePath = path.join('/api/uploads', req.file.filename);
    try {
      const result = await mainService.uploadImage(req.body, imagePath);
      res.status(200).json(buildResponse(true, 200, "Success", result));
    } catch (error) {
      res.status(500).json(buildResponse(false, 500, error.message));
    }
  });
};

const createTable = async (req, res) => {
  try {
    const result = await mainService.createTable();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "No tables created"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const mockPopulateTable = async (req, res) => {
  try {
    const result = await mainService.mockPopulateTable();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "No tables populated"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

module.exports = {
  uploadImage,
  createTable,
  mockPopulateTable
};