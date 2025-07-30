const db = require('../config/db');

const getAllGigs = async () => {
  const query = ` 
    SELECT
      g.gig_id, 
      g.gig_name, 
      v.venue_city,
      g.image_path
    FROM 
      Gig g
    JOIN 
      Venue v ON g.venue_id = v.venue_id
    WHERE
      g.verified = 1 AND g.is_festival = 0
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const getAllFestivals = async () => {
  const query = ` 
    SELECT
      g.gig_id, 
      g.gig_name,
      g.image_path
    FROM 
      Gig g
    WHERE
      g.verified = 1 AND g.is_festival = 1
  ;`;

  const [rows] = await db.query(query);
  return rows;
};

const getSupportsByGigId = async (gig_id) => {
  const query = ` 
    SELECT
      g.supports
    FROM 
      Gig g
    WHERE
      g.gig_id = ?
  ;`;

  const [rows] = await db.query(query, [gig_id]);
  return rows;
};

const getGigByArtistId = async (artist_id) => {
  const query = ` 
    SELECT
      g.gig_id,
      g.artist_id,
      g.gig_name,
      g.supports,
      g.date
    FROM 
      Gig g
    JOIN 
      Venue v ON g.venue_id = v.venue_id
    WHERE
      g.verified = 1 AND g.artist_id = ?
  ;`;

  const [rows] = await db.query(query, [artist_id]);
  return rows;
};

const getGigById = async (venue_id, artist_id, gig_id) => {
  const query = `
    SELECT *
    FROM Gig
    WHERE venue_id = ? AND artist_id = ? AND gig_id = ?
  ;`;

  const [rows] = await db.query(query, [venue_id, artist_id, gig_id]);
  return rows;
};

const getGigByGigId = async (gig_id) => {
  const query = `
    SELECT
      g.gig_id, 
      g.gig_name,
      g.venue_id,
      g.date,
      g.doors_time,
      g.original_price,
      g.sale_price,
      g.booking_fee,
      g.tickets_available,
      g.tickets_sold,
      g.disclaimer,
      g.description,
      v.venue_name,
      g.image_path
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

const getTotalPriceOfGigs = async (gig_ids) => {
  const query = `
    SELECT
      gig_id, SUM(sale_price + booking_fee) AS total_price
    FROM
      Gig
    WHERE
      gig_id IN (?)
    GROUP BY
      gig_id
  ;`;

  const [rows] = await db.query(query, [gig_ids]);
  return rows;
};

const getGigCartInfo = async (gig_id) => {
  const query = `
    SELECT
      image_path, gig_name, booking_fee, sale_price
    FROM
      Gig
    WHERE
      gig_id = ?
  ;`;

  const [rows] = await db.query(query, [gig_id]);
  return rows[0];
};

const getGigsCheckoutInfo = async (gig_ids) => {
  const query = `
    SELECT
      gig_name, sale_price, booking_fee, date
    FROM
      Gig
    WHERE
      gig_id IN (?)
  ;`;

  const [rows] = await db.query(query, [gig_ids]);
  return rows;
};

const createGig = async (artist_id, venue_id, is_festival, date, doors_time, description, original_price, sale_price, tickets_available, gig_name, booking_fee, image_path) => {
  const query = `
    INSERT INTO Gig
      (artist_id, venue_id, is_festival, date, doors_time, description, original_price, sale_price, tickets_available, gig_name, booking_fee, image_path)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ;`;

  const [rows] = await db.query(query, [artist_id, venue_id, is_festival, date, doors_time, description, original_price, sale_price, tickets_available, gig_name, booking_fee, image_path]);
  return rows;
};

const updateGig = async (venue_id, date, doors_time, description, sale_price, tickets_available, gig_name, image_path, gig_id) => {
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
      image_path = ?
    WHERE gig_id = ?
  ;`;

  const [rows] = await db.query(query, [venue_id, date, doors_time, description, sale_price, tickets_available, gig_name, image_path, gig_id]);
  return rows;
};

const deleteGig = async (venue_id, artist_id, gig_id) => {
  const query = `
    DELETE FROM Gig
    WHERE venue_id = ? AND artist_id = ? AND gig_id = ?
  ;`;

  const [result] = await db.query(query, [venue_id, artist_id, gig_id]);
  return result;
};

const setSupport = async (artist_id, gig_id, responded, accepted) => {
  const query = `
    INSERT INTO ArtistSupportGig
      (artist_id, gig_id, responded, accepted)
    VALUES 
      (?, ?, ?, ?)
  ;`;

  const [rows] = await db.query(query, [artist_id, gig_id, responded, accepted]);
  return rows;
}

const updateSupport = async (responded, accepted, artist_id, gig_id) => {
  const query = `
    UPDATE ArtistSupportGig
    SET
      responded = ?,
      accepted = ?
    WHERE
      artist_id = ? AND gig_id = ?
  ;`;

  const [rows] = await db.query(query, [responded, accepted, artist_id, gig_id]);
  return rows;
}

const getAllSupportRequests = async (artist_id) => {
  const query = `
    SELECT
      ArtistSupportGig.artist_id, ArtistSupportGig.gig_id, Gig.gig_name
    FROM 
      ArtistSupportGig
    INNER JOIN
      Gig ON ArtistSupportGig.gig_id = Gig.gig_id
    WHERE
      ArtistSupportGig.artist_id = ? AND ArtistSupportGig.responded = 0
  ;`;

  const [rows] = await db.query(query, [artist_id]);
  return rows;
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
