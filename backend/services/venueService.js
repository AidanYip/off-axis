const venueModel = require('../models/venueModel');

const getAllVenues = async () => {
  const result = venueModel.getAllVenues();
  return result;
};

const getAllVenueNames = async () => {
  const result = venueModel.getAllVenueNames();
  return result;
};

const getVenueById = async (req) => {
  const { venue_id } = req;

  const result = venueModel.getVenueById(venue_id);
  return result;
}

const getVenueByGigId = async (req) => {
  const { gig_id } = req;

  const result = venueModel.getVenueByGigId(gig_id);
  return result;
}

const createVenue = async (req) => {
  const { venue_name, venue_capacity, venue_city, venue_address, venue_link, description, image_path } = req;

  const verified = 1;
  const is_festival = 0;

  const result = await venueModel.createVenue(venue_name, venue_capacity, venue_city, venue_address, venue_link, description, is_festival, verified, image_path);
  return result;
};

const updateVenue = async (req) => {
  const { venue_id, venue_name, venue_capacity, venue_address, venue_link, description, is_festival, verified } = req;

  const result = await venueModel.updateVenue(venue_id, venue_name, venue_capacity, venue_address, venue_link, description, is_festival, verified);
  return result;
};

const deleteVenue = async (req) => {
  const { venue_id } = req;

  const result = await venueModel.deleteVenue(venue_id);
  return result;
}

module.exports = {
  getAllVenues,
  getAllVenueNames,
  getVenueById,
  getVenueByGigId,
  createVenue,
  updateVenue,
  deleteVenue
}
