const db = require('../config/db');

const getUpcomingGigs = async () => {
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
    ORDER BY 
      g.gig_id DESC
    LIMIT 4
  ;`;
        
  const [rows] = await db.query(query);
  return rows;
};

const getRecentGigs = async () => {
  const query = ` 
    SELECT
      g.gig_id, 
      g.gig_name, 
      v.venue_name,
      g.date,
      g.supports
    FROM 
      Gig g
    JOIN 
      Venue v ON g.venue_id = v.venue_id
    WHERE 
      g.date >= CURDATE()
    ORDER BY 
      g.date ASC
    LIMIT 4
  ;`;
        
  const [rows] = await db.query(query);
  return rows;
};

const getArtistOfTheWeek = async () => {
  const query = ` 
    SELECT 
      a.artist_id,
      a.name,
      a.bio,
      a.image_path
    FROM 
      Artist a
    JOIN 
      Gig g ON a.artist_id = g.artist_id
    # WHERE 
    #     g.date BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()
    GROUP BY 
      a.artist_id, a.name, a.bio
    ORDER BY 
      SUM(g.tickets_sold) DESC
    LIMIT 1;
  ;`;
        
  const [rows] = await db.query(query);
  return rows;
};

module.exports = {
  getUpcomingGigs,
  getRecentGigs,
  getArtistOfTheWeek,
};