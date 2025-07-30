const adminModel = require("../models/adminModel");

// Artists

const getAllArtists = async () => {
  const result = adminModel.getAllArtists();
  return result;
};

const getAllArtistApplications = async () => {
  const result = adminModel.getAllArtistApplications();
  return result;
};

const getArtistById = async (req) => {
  const { artist_id } = req;

  const result = adminModel.getArtistById(artist_id);
  return result;
};

const updateArtist = async (req) => {
  const {
    name,
    town,
    music_link,
    mobile_number,
    genre,
    links,
    bio,
    image_path,
    bank_full_name,
    bank_account_type,
    bank_account_number,
    sort_code,
    verified,
    artist_id,
  } = req;

  const result = await adminModel.updateArtist(
    name,
    town,
    music_link,
    mobile_number,
    genre,
    links,
    bio,
    image_path,
    bank_full_name,
    bank_account_type,
    bank_account_number,
    sort_code,
    verified,
    artist_id
  );
  return result;
};

const deleteArtist = async (req) => {
  const { artist_id } = req;

  const result = await adminModel.deleteArtist(artist_id);
  return result;
};

const approveArtist = async (req) => {
  var { artist_id } = req;

  const result = await adminModel.approveArtist(artist_id);
  return result;
};

// Gigs

const getAllUpcomingGigsArtistInfo = async () => {
  const result = adminModel.getAllUpcomingGigsArtistInfo();
  return result;
};

const getAllGigDraftsArtistInfo = async () => {
  const result = adminModel.getAllGigDraftsArtistInfo();
  return result;
};

const getAllPastGigsArtistInfo = async () => {
  const result = adminModel.getAllPastGigsArtistInfo();
  return result;
};

const getGigByGigId = async (req) => {
  const { gig_id } = req;

  const result = adminModel.getGigByGigId(gig_id);
  return result;
};

const updateGig = async (req) => {
  const { gig_id, venue_id, date, doors_time, description, original_price, tickets_available, gig_name, verified, image_path } = req;
  const sale_price = original_price;

  const result = await adminModel.updateGig(venue_id, date, doors_time, description, sale_price, tickets_available, gig_name, image_path, verified, gig_id);
  return result;
};

const approveGig = async (req) => {
  var { gig_id } = req;

  const result = await adminModel.approveGig(gig_id);
  return result;
};

const deleteGig = async (req) => {
  const { gig_id } = req;

  const result = await adminModel.deleteGig(gig_id);
  return result;
};

// Festivals (Exists as Gig in DB)

const getAllUpcomingFestivals = async () => {
  const result = adminModel.getAllUpcomingFestivals();
  return result;
};

const getAllPastFestivals = async () => {
  const result = adminModel.getAllPastFestivals();
  return result;
};

const getFestivalByGigId = async (req) => {
  const { gig_id } = req;

  const result = adminModel.getFestivalByGigId(gig_id);
  return result;
};

const createFestival = async (req) => {
  const {
    artist_id,
    date,
    doors_time,
    description,
    original_price,
    tickets_available,
    gig_name,
  } = req;

  const sale_price = original_price;
  const is_festival = 1;

  const result = await artistModel.createFestival(
    artist_id,
    is_festival,
    date,
    doors_time,
    description,
    original_price,
    sale_price,
    tickets_available,
    gig_name
  );
  return result;
};

const updateFestival = async (req) => {
  var { gig_id, gig_name, verified } = req;

  if (!verified) {
    verified = 0;
  } else {
    verified = 1;
  }

  const result = await adminModel.updateFestival(gig_id, gig_name, verified);
  return result;
};

const approveFestival = async (req) => {
  var { gig_id } = req;

  const result = await adminModel.approveFestival(gig_id);
  return result;
};

const deleteFestival = async (req) => {
  const { gig_id } = req;

  const result = await adminModel.deleteFestival(gig_id);
  return result;
};

module.exports = {
  getAllArtists,
  getAllArtistApplications,
  getArtistById,
  updateArtist,
  deleteArtist,
  approveArtist,
  getAllUpcomingGigsArtistInfo,
  getAllGigDraftsArtistInfo,
  getAllPastGigsArtistInfo,
  getGigByGigId,
  updateGig,
  approveGig,
  deleteGig,
  getAllPastFestivals,
  getAllUpcomingFestivals,
  getFestivalByGigId,
  createFestival,
  updateFestival,
  approveFestival,
  deleteFestival,
};
