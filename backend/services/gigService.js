const gigModel = require('../models/gigModel');

const getAllGigs = async () => {
  const result = gigModel.getAllGigs();
  return result;
};

const getAllFestivals = async () => {
  const result = gigModel.getAllFestivals();
  return result;
};

const getSupportsByGigId = async (req) => {
  const { gig_id } = req;

  const result = gigModel.getSupportsByGigId(gig_id);
  return result;
}

const getGigByArtistId = async (req) => {
  const { artist_id } = req;

  const result = gigModel.getGigByArtistId(artist_id);
  return result;
}

const getGigById = async (req) => {
  const { venue_id, artist_id, gig_id } = req;

  const result = gigModel.getGigById(venue_id, artist_id, gig_id);
  return result;
};

const getGigByGigId = async (req) => {
  const { gig_id } = req;

  const result = gigModel.getGigByGigId(gig_id);
  return result;
};

const getTotalPriceOfGigs = async (req) => {
  const { gig_ids } = req;

  const result = gigModel.getTotalPriceOfGigs(gig_ids);
  return result;
};

const getGigCartInfo = async (req) => {
  const { gig_id } = req;

  const result = gigModel.getGigCartInfo(gig_id);
  return result;
};

const getGigsCheckoutInfo = async (req) => {
  const { gig_ids } = req;

  const result = gigModel.getGigsCheckoutInfo(gig_ids);
  return result;
};

const createGig = async (req) => {
  const { artist_id, venue_id, date, doors_time, description, original_price, tickets_available, gig_name, image_path } = req;

  const sale_price = original_price;
  const is_festival = 0;
  const booking_fee = 1.25;

  const result = await gigModel.createGig(artist_id, venue_id, is_festival, date, doors_time, description, original_price, sale_price, tickets_available, gig_name, booking_fee, image_path);
  return result;
};

const updateGig = async (req) => {
  const { gig_id, venue_id, date, doors_time, description, original_price, tickets_available, gig_name, image_path } = req;

  const sale_price = original_price;

  const result = await gigModel.updateGig(venue_id, date, doors_time, description, sale_price, tickets_available, gig_name, image_path, gig_id);
  return result;
};

const deleteGig = async (req) => {
  const { venue_id, artist_id, gig_id } = req;

  const result = await gigModel.deleteGig(venue_id, artist_id, gig_id);
  return result;
}

const setSupport = async (req) => {
  const { supports, gig_id } = req;

  const responded = 0;
  const accepted = 0;
  const artist_id = supports;

  const result = await gigModel.setSupport(artist_id, gig_id, responded, accepted);
  return result;
}

const updateSupport = async (req) => {
  const { responded, accepted, artist_id, gig_id } = req;

  const result = await gigModel.updateSupport(responded, accepted, artist_id, gig_id);
  return result;
}

const getAllSupportRequests = async (req) => {
  const { artist_id } = req;

  const result = gigModel.getAllSupportRequests(artist_id);
  return result;
}

module.exports = {
  getAllGigs,
  getGigById,
  getGigByGigId,
  getGigByArtistId,
  getTotalPriceOfGigs,
  getGigCartInfo,
  getGigsCheckoutInfo,
  createGig,
  updateGig,
  deleteGig,
  getAllFestivals,
  getSupportsByGigId,
  setSupport,
  updateSupport,
  getAllSupportRequests,
}
