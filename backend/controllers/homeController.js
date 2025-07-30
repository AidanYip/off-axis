const homeService = require('../services/homeService');
const { buildResponse } = require('../helpers/responseHelper');

const getUpcomingGigs = async (req, res) => {
  try {
    const result = await homeService.getUpcomingGigs();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getRecentGigs = async (req, res) => {
  try {
    const result = await homeService.getRecentGigs();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }
    
    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getArtistOfTheWeek = async (req, res) => {
  try {
    const result = await homeService.getArtistOfTheWeek();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

module.exports = {
  getUpcomingGigs,
  getRecentGigs,
  getArtistOfTheWeek
};
