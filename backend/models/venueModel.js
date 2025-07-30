const db = require('../config/db');

const getAllVenues = async () => {
  const query = ` 
    SELECT *
    FROM Venue
  `;
        
  const [rows] = await db.query(query);
  return rows;
};

const getAllVenueNames = async () => {
  const query = `
    SELECT venue_id, venue_name, venue_city
    FROM Venue
  `;

  const [rows] = await db.query(query);
  return rows;
};

const getVenueById = async (venue_id) => {
  const query = `
    SELECT *
    FROM Venue
    WHERE venue_id = ?
  `;

  const [rows] = await db.query(query, [venue_id]);
  return rows;
};

const getVenueByGigId = async (gig_id) => {
  const query = `
    SELECT
      v.venue_id, 
      v.venue_name, 
      v.venue_address,
      v.venue_description,
      v.image_path
    FROM 
      Venue v
    JOIN 
      Gig g ON g.venue_id = v.venue_id
    WHERE
      g.gig_id = ?
  `;

  const [rows] = await db.query(query, [gig_id]);
  return rows;
};

const createVenue = async (venue_name, venue_capacity, venue_city, venue_address, venue_link, description, is_festival, verified, image_path) => {
  const query = `
    INSERT INTO Venue
      (venue_name, venue_capacity, venue_city, venue_address, venue_link, description, is_festival, verified, image_path)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const [rows] = await db.query(query, [venue_name, venue_capacity, venue_city, venue_address, venue_link, description, is_festival, verified, image_path]);
  return rows;
};

const updateVenue = async (venue_id, venue_name, venue_capacity, venue_address, venue_link, description, is_festival, verified) => {
  const query = `
    UPDATE Venue
    SET
      venue_name = ?,
      venue_capacity = ?,
      venue_address = ?,
      venue_link = ?,
      description = ?,
      is_festival = ?,
      verified = ?
    WHERE
      venue_id = ?;
  `;

  const [rows] = await db.query(query, [venue_name, venue_capacity, venue_address, venue_link, description, is_festival, verified, venue_id]);
  return rows;
};

const deleteVenue = async (venue_id) => {
  const query = `
    DELETE FROM Venue
    WHERE venue_id = ?;
  `;

  const [result] = await db.query(query, [venue_id]);
  return result;
};


module.exports = {
  getAllVenues,
  getAllVenueNames,
  getVenueById,
  getVenueByGigId,
  createVenue,
  updateVenue,
  deleteVenue
}
