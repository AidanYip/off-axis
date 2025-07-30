const artistModel = require('../models/artistModel');

const getAllArtists = async () => {
  const result = artistModel.getAllArtists();
  return result;
};

const getAllArtistIds = async () => {
  const result = artistModel.getAllArtistIds();
  return result;
};

const getArtistById = async (req) => {
  const { artist_id } = req;

  const result = artistModel.getArtistById(artist_id);
  return result;
}

const getArtistIdByUserId = async (req) => {
  const { user_id } = req;

  const result = artistModel.getArtistIdByUserId(user_id);
  return result;
}

const createArtist = async (req) => {
  const { is_festival, name, bio, links, credits, genre, sort_code, account_number, account_name, verified } = req;

  const result = await artistModel.createArtist(is_festival, name, bio, links, credits, genre, sort_code, account_number, account_name, verified);
  return result;
};

const updateArtist = async (req) => {
  const { name, town, music_link, mobile_number, genre, links, bio, image_path, bank_full_name, bank_account_type, bank_account_number, sort_code, artist_id } = req;

  const result = await artistModel.updateArtist(name, town, music_link, mobile_number, genre, links, bio, image_path, bank_full_name, bank_account_type, bank_account_number, sort_code, artist_id);
  return result;
}

const deleteArtist = async (req) => {
  const { artist_id } = req;

  const result = await artistModel.deleteArtist(artist_id);
  return result;
}

const registerArtist = async (req) => {
  const { user_id, name, town, music_link, mobile_number, genre, links, first_headline_gig, need_help_booking, bio, bank_full_name, bank_account_type, bank_account_number, sort_code, image_path } = req;

  const is_fesitval = 0;
  formatted_need_help_booking = need_help_booking === true ? 1 : 0;
  if (!first_headline_gig) {
    formatted_first_headline_gig = null;
  } else {
    formatted_first_headline_gig = first_headline_gig;
  }

  const result = await artistModel.registerArtist(user_id, name, town, music_link, mobile_number, genre, links, formatted_first_headline_gig, formatted_need_help_booking, bio, bank_full_name, bank_account_type, bank_account_number, sort_code, image_path, is_fesitval);
  return result;
}

module.exports = {
  getAllArtists,
  getAllArtistIds,
  getArtistById,
  getArtistIdByUserId,
  createArtist,
  updateArtist,
  deleteArtist,
  registerArtist,
}
