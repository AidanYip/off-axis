const db = require("../config/db");

// Artists

const getAllArtists = async () => {
  const query = ` 
    SELECT *
    FROM Artist
    WHERE Artist.verified = 1
    AND Artist.is_festival = 0
    ORDER BY Artist.name ASC
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const getAllArtistApplications = async () => {
  const query = ` 
    SELECT *
    FROM Artist
    WHERE Artist.verified = 0
    AND Artist.is_festival = 0
    ORDER BY Artist.name ASC
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const getArtistById = async (artist_id) => {
  const query = `
    SELECT *
    FROM Artist
    WHERE artist_id = ?
  ;`;

  const [rows] = await db.query(query, [artist_id]);
  return rows;
};

const updateArtist = async (name, town, music_link, mobile_number, genre, links, bio, image_path, bank_full_name, bank_account_type, bank_account_number, sort_code, verified, artist_id) => {
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
      sort_code = ?,
      verified = ?
    WHERE artist_id = ?
  ;`;

  const [rows] = await db.query(query, [name, town, music_link, mobile_number, genre, links, bio, image_path, bank_full_name, bank_account_type, bank_account_number, sort_code, verified, artist_id]);
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

const approveArtist = async (artist_id) => {
  const query = `
    UPDATE Artist
    SET
      verified = 1
    WHERE artist_id = ?
  ;`;

  const [rows] = await db.query(query, [artist_id]);
  return rows;
};

// Gigs

const getAllUpcomingGigsArtistInfo = async () => {
  const query = ` 
    SELECT *
    FROM Gig, Artist
    WHERE Gig.date >= CURRENT_DATE()
    AND Gig.artist_id = Artist.artist_id
    AND Gig.verified = 1
    AND Gig.is_festival = 0
    ORDER BY Gig.date ASC
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const getAllGigDraftsArtistInfo = async () => {
  const query = ` 
    SELECT *
    FROM Gig, Artist
    WHERE Gig.artist_id = Artist.artist_id
    AND Gig.verified = 0
    AND Gig.is_festival = 0
    ORDER BY Gig.date ASC
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const getAllPastGigsArtistInfo = async () => {
  const query = ` 
    SELECT *
    FROM Gig, Artist
    WHERE Gig.date < CURRENT_DATE()
    AND Gig.artist_id = Artist.artist_id
    AND Gig.verified = 1
    AND Gig.is_festival = 0
    ORDER BY Gig.date ASC
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const getGigByGigId = async (gig_id) => {
  const query = `
    SELECT
      g.gig_id, 
      g.gig_name,
      g.date,
      g.doors_time,
      g.original_price,
      g.sale_price,
      g.booking_fee,
      g.tickets_available,
      g.tickets_sold,
      g.disclaimer,
      g.supports,
      g.description,
      v.venue_name,
      a.name,
      g.image_path,
      g.verified
    FROM
      Gig g, Venue v, Artist a
    WHERE gig_id = ?
    AND g.venue_id = v.venue_id
    AND g.artist_id = a.artist_id
  ;`;

  const [rows] = await db.query(query, [gig_id]);
  return rows;
};

const updateGig = async (venue_id, date, doors_time, description, sale_price, tickets_available, gig_name, image_path, verified, gig_id) => {
  const query = `
    UPDATE Gig
    SET
      venue_id = ?,
      date = ?,
      doors_time = ?,
      description = ?,
      sale_price = ?,
      tickets_available = ?,
      gig_name = ?,
      image_path = ?,
      verified = ?
    WHERE gig_id = ?
  ;`;

  const [rows] = await db.query(query, [venue_id, date, doors_time, description, sale_price, tickets_available, gig_name, image_path, verified, gig_id]);
  return rows;
};

const approveGig = async (gig_id) => {
  const query = `
    UPDATE Gig
    SET
      verified = 1
    WHERE gig_id = ?
  ;`;

  const [rows] = await db.query(query, [gig_id]);
  return rows;
};

const deleteGig = async (gig_id) => {
  const query = `
    DELETE FROM Gig
    WHERE gig_id = ?;
  ;`;

  const [result] = await db.query(query, [gig_id]);
  return result;
};

// Festivals (Exists as Gig in DB)

const getAllUpcomingFestivals = async () => {
  const query = ` 
    SELECT *
    FROM Gig, Artist
    WHERE Gig.date >= CURRENT_DATE()
    AND Gig.artist_id = Artist.artist_id
    AND Gig.verified = 1
    AND Gig.is_Festival = 1
    ORDER BY Gig.date ASC
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const getAllPastFestivals = async () => {
  const query = ` 
    SELECT *
    FROM Gig, Artist
    WHERE Gig.date < CURRENT_DATE()
    AND Gig.artist_id = Artist.artist_id
    AND Gig.verified = 1
    AND Gig.is_Festival = 1
    ORDER BY Gig.date ASC
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const updateFestival = async (gig_id, gig_name, verified) => {
  const query = `
    UPDATE Gig
    SET
      gig_name = ?,
      verified = ?
    WHERE gig_id = ?
  ;`;

  const [rows] = await db.query(query, [gig_name, verified, gig_id]);
  return rows;
};

const approveFestival = async (gig_id) => {
  const query = `
    UPDATE Gig
    SET
      verified = 1
    WHERE gig_id = ?
  ;`;

  const [rows] = await db.query(query, [gig_id]);
  return rows;
};

const deleteFestival = async (gig_id) => {
  const query = `
    DELETE FROM Gig
    WHERE gig_id = ?;
  ;`;

  const [result] = await db.query(query, [gig_id]);
  return result;
};

const createFestival = async (
  artist_id,
  is_festival,
  date,
  doors_time,
  description,
  original_price,
  sale_price,
  tickets_available,
  gig_name
) => {
  const query = `
    INSERT INTO Gig
      (artist_id, is_festival, date, doors_time, description, original_price, sale_price, tickets_available, gig_name)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
  ;`;

  const [rows] = await db.query(query, [
    artist_id,
    is_festival,
    date,
    doors_time,
    description,
    original_price,
    sale_price,
    tickets_available,
    gig_name,
  ]);
  return rows;
};

const getFestivalByGigId = async (gig_id) => {
  const query = `
    SELECT
      g.gig_id, 
      g.gig_name,
      g.date,
      g.doors_time,
      g.original_price,
      g.tickets_available,
      g.tickets_sold,
      g.description,
      v.venue_name,
      g.image_path,
      g.verified
    FROM
      Gig g
    JOIN 
      Venue v ON g.venue_id = v.venue_id
    WHERE
      gig_id = ?
  ;`;

  const [rows] = await db.query(query, [gig_id]);
  return rows;
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
  getAllUpcomingFestivals,
  getAllPastFestivals,
  updateFestival,
  approveFestival,
  deleteFestival,
  createFestival,
  getFestivalByGigId,
};
