const db = require('../config/db');

const getAllArtists = async () => {
  const query = ` 
    SELECT *
    FROM Artist
    WHERE Artist.verified = 1
  ;`;
        
  const [rows] = await db.query(query);
  return rows;
};

const getAllArtistIds = async () => {
  const query = ` 
    SELECT artist_id, name
    FROM Artist
    WHERE Artist.verified = 1
  ;`;
        
  const [rows] = await db.query(query);
  return rows;
};

const getArtistById = async (artist_id) => {
  const query = `
    SELECT *
    FROM Artist
    WHERE artist_id = ? AND verified = 1
  ;`;

  const [rows] = await db.query(query, [artist_id]);
  return rows;
};

const getArtistIdByUserId = async (user_id) => {
  const query = `
    SELECT artist_id
    FROM Artist
    WHERE user_id = ?
    LIMIT 1;
  ;`;

  const [rows] = await db.query(query, [user_id]);
  return rows;
};

const createArtist = async (is_festival, name, bio, links, credits, genre, sort_code, account_number, account_name, verified) => {
  const query = `
    INSERT INTO Artist
      (is_festival, name, bio, links, credits, genre, sort_code, account_number, account_name, verified)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ;`;

  const [rows] = await db.query(query, [is_festival, name, bio, links, credits, genre, sort_code, account_number, account_name, verified]);
  return rows;
};

const updateArtist = async (name, town, music_link, mobile_number, genre, links, bio, image_path, bank_full_name, bank_account_type, bank_account_number, sort_code, artist_id) => {
  const query = `
    UPDATE Artist
    SET 
      name = ?,
      town = ?,
      music_link = ?,
      mobile_number = ?,
      genre = ?,
      links = ?,
      bio = ?,
      image_path = ?,
      bank_full_name = ?,
      bank_account_type = ?,
      bank_account_number = ?,
      sort_code = ?
    WHERE artist_id = ?
  ;`;

  const [rows] = await db.query(query, [name, town, music_link, mobile_number, genre, links, bio, image_path, bank_full_name, bank_account_type, bank_account_number, sort_code, artist_id]);
  return rows;
};

const deleteArtist = async (artist_id) => {
  const query = `
    DELETE FROM Artist
    WHERE artist_id = ?;
  ;`;

  const [result] = await db.query(query, [artist_id]);
  return result;
};

const registerArtist = async (user_id, name, town, music_link, mobile_number, genre, links, first_headline_gig, need_help_booking, bio, bank_full_name, bank_account_type, bank_account_number, sort_code, image_path, is_festival) => {
  const query = `
    INSERT INTO Artist
      (user_id, name, town, music_link, mobile_number, genre, links, first_headline_gig, need_help_booking, bio, bank_full_name, bank_account_type, bank_account_number, sort_code, image_path, is_festival)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ;`;

  const [rows] = await db.query(query, [user_id, name, town, music_link, mobile_number, genre, links, first_headline_gig, need_help_booking, bio, bank_full_name, bank_account_type, bank_account_number, sort_code, image_path, is_festival]);
  return rows;
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
