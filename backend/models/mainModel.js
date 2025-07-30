const db = require('../config/db');
const uploadImage = async (model, model_id, imagePath) => {
  const query = `
    UPDATE ${model}
    SET
      image_path = ?
    WHERE ${model}_id = ?
  ;`;

  const [rows] = await db.query(query, [imagePath, model_id]);
  return rows;
}

const createTable = async () => {
  // Version 2
  const queries = [
    `CREATE TABLE IF NOT EXISTS User (
      user_id INT PRIMARY KEY AUTO_INCREMENT,
      email VARCHAR(256),
      password VARCHAR(256),
      ticket_list JSON,
      first_name VARCHAR(256) DEFAULT NULL,
      last_name VARCHAR(256) DEFAULT NULL,
      image_path VARCHAR(256) DEFAULT NULL,
      role VARCHAR(256) DEFAULT 'Customer',
      provider VARCHAR(256) DEFAULT NULL,
      jwt_token TEXT,
      is_guest BOOLEAN DEFAULT FALSE,
      company_name VARCHAR(256) DEFAULT NULL,
      country VARCHAR(256) DEFAULT NULL,
      street_addr_1 VARCHAR(256) DEFAULT NULL,
      street_addr_2 VARCHAR(256) DEFAULT NULL,
      town VARCHAR(256) DEFAULT NULL,
      county VARCHAR(256) DEFAULT NULL,
      postcode VARCHAR(256) DEFAULT NULL,
      phone VARCHAR(256) DEFAULT NULL,
      created_at DATETIME DEFAULT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS Artist (
      artist_id INT PRIMARY KEY AUTO_INCREMENT,
      is_festival BOOLEAN,
      name VARCHAR(256),
      bio TEXT NULL,
      links JSON NULL,
      credits INT DEFAULT 0,
      genre JSON NULL,
      sort_code VARCHAR(6),
      account_number VARCHAR(8),
      account_name VARCHAR(256),
      verified BOOLEAN DEFAULT FALSE,
      image_path VARCHAR(255) DEFAULT NULL,
      user_id INT DEFAULT NULL,
      town VARCHAR(256) DEFAULT NULL,
      mobile_number VARCHAR(256) DEFAULT NULL,
      music_link VARCHAR(256) DEFAULT NULL,
      first_headline_gig DATETIME DEFAULT NULL,
      need_help_booking BOOLEAN DEFAULT FALSE,
      bank_full_name VARCHAR(256) DEFAULT NULL,
      bank_account_type VARCHAR(256) DEFAULT NULL,
      bank_account_number VARCHAR(256) DEFAULT NULL,
      FOREIGN KEY (user_id) REFERENCES User(user_id)
    );`,
    `CREATE TABLE IF NOT EXISTS Venue (
      venue_id INT PRIMARY KEY AUTO_INCREMENT,
      venue_name VARCHAR(256),
      venue_capacity INT,
      venue_city VARCHAR(256),
      venue_address VARCHAR(256),
      venue_link VARCHAR(256),
      description TEXT NULL,
      is_festival BOOLEAN,
      verified BOOLEAN DEFAULT FALSE,
      image_path VARCHAR(255) DEFAULT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS Gig (
      gig_id INT PRIMARY KEY AUTO_INCREMENT,
      artist_id INT,
      venue_id INT,
      is_festival BOOLEAN,
      date DATE,
      doors_time TIME,
      disclaimer TEXT NULL,
      description TEXT NULL,
      supports JSON NULL,
      original_price DECIMAL(10, 2),
      sale_price DECIMAL(10, 2),
      booking_fee DECIMAL(10, 2),
      tickets_available INT,
      tickets_sold INT DEFAULT 0,
      verified BOOLEAN DEFAULT FALSE,
      image_path VARCHAR(255) DEFAULT NULL,
      gig_name VARCHAR(255) DEFAULT 'Untitled Gig',
      FOREIGN KEY (artist_id) REFERENCES Artist(artist_id),
      FOREIGN KEY (venue_id) REFERENCES Venue(venue_id)
    );`,
    `CREATE TABLE IF NOT EXISTS Coupon (
      coupon_id INT PRIMARY KEY AUTO_INCREMENT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      code VARCHAR(256) DEFAULT NULL,
      percentage INT DEFAULT NULL,
      uses INT DEFAULT NULL,
      is_active BOOLEAN DEFAULT '1',
      verified BOOLEAN DEFAULT '0',
      image_path VARCHAR(256) DEFAULT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS Ticket (
      ticket_id INT PRIMARY KEY AUTO_INCREMENT,
      image_path VARCHAR(256) DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_used BOOLEAN DEFAULT NULL,
      verified BOOLEAN DEFAULT '0'
    );`,
    `CREATE TABLE IF NOT EXISTS Cart_Item (
      item_id INT PRIMARY KEY AUTO_INCREMENT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id INT DEFAULT NULL,
      gig_id INT DEFAULT NULL,
      amount INT DEFAULT NULL,
      is_purchased BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (user_id) REFERENCES User(user_id),
      FOREIGN KEY (gig_id) REFERENCES Gig(gig_id)
    );`
  ];

  const results = [];
  try {
    for (const query of queries) {
      const [rows] = await db.query(query);
      results.push(rows)
    }
  } catch (error) {
    console.error("Error creating table: ", error);
  }
  return results;
};

const mockPopulateTable = async () => {
  const queries = [
    `INSERT INTO User (company_name, country, county, created_at, email, first_name, image_path, is_guest, jwt_token, last_name, password, phone, postcode, provider, role, street_addr_1, street_addr_2, town, user_id) VALUES
    (NULL, NULL, NULL, '2025-01-29 16:34:27', 'john_doe@gmail.com', 'John', NULL, 0, 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwiZmlyc3RfbmFtZSI6IkpvaG4iLCJsYXN0X25hbWUiOiJEb2UiLCJyb2xlIjoiQ3VzdG9tZXIiLCJwcm92aWRlciI6InNlbGYiLCJlbWFpbCI6ImpvaG5fZG9lQGdtYWlsLmNvbSIsImlhdCI6MTczODE2ODQ2N30.WJMoGFPWRUXnmgB_jILXtyupHbkrnrcZoxoIR_k94fo', 
    'Doe', '$2b$10$uv0Zxeuu0qvoqlpZAaM85OoQwtbQZijOBZYZi5f6dsxknP2vxP.vW', NULL, NULL, 'self', 'Customer', NULL, NULL, NULL, 10),

    (NULL, NULL, NULL, '2025-02-12 15:44:35', 'sirapop33408@gmail.com', 'Sirapop', NULL, 0, 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxOCwiZmlyc3RfbmFtZSI6IlNpcmFwb3AiLCJsYXN0X25hbWUiOiJUdW50aXRoYW5ha2lqIiwicm9sZSI6IkN1c3RvbWVyIiwicHJvdmlkZXIiOiJnb29nbGUiLCJlbWFpbCI6InNpcmFwb3AzMzQwOEBnbWFpbC5jb20iLCJpYXQiOjE3MzkzNzUwNzV9.ryYxls0NUhJQ_XoweJBuAft3JsuCvFGb7DL7N3HfUjc', 
    'Tuntithanakij', '$2b$10$N7lwkiWrdYlgX81XxIXT7.8dUu8TjYHyjRzdohX.3K/X21ERqbjwm', NULL, NULL, 'google', 'Customer', NULL, NULL, NULL, 18),

    (NULL, NULL, NULL, '2025-02-19 01:35:42', 'admin@gmail.com', 'admin', NULL, 0, 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoiYWRtaW4iLCJyb2xlIjoiQ3VzdG9tZXIiLCJwcm92aWRlciI6InNlbGYiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTczOTkyODk0Mn0.7-hTj7tsWIkYRTulJHwqeKj7HGBk4NwmsweNTzDi8T0', 
    'admin', '$2b$10$TTa0Wwek6Bck/kGbRmtztu9PPPSU7IyxRBFZO2cU4sn57jCLwRfQe', NULL, NULL, 'self', 'Admin', NULL, NULL, NULL, 21),

    (NULL, NULL, NULL, '2025-02-19 01:38:05', 'ladida@gmail.com', 'Ladida', '/api/uploads/1737503805691-LaDiDa_sq.jpeg', 0, 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMiwiZmlyc3RfbmFtZSI6IkxhZGlkYSIsImxhc3RfbmFtZSI6IkxhZGlkZHkiLCJyb2xlIjoiQ3VzdG9tZXIiLCJwcm92aWRlciI6InNlbGYiLCJlbWFpbCI6ImxhZGlkYUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5MjkwODV9.aDsBC2cxl94mjL6Gwiu8bkoJsEo6anNVL2Bc-8JlbfM', 
    'Ladiddy', '$2b$10$ZYfdi82FRmh4BJsyGrlOheYA7qgt0fJALoK.m4DGZW4aT78G6cSCS', NULL, NULL, 'self', 'Artist', NULL, NULL, NULL, 22),

    (NULL, NULL, NULL, '2025-02-19 01:40:12', 'muddyelephant@gmail.com', 'Muddy', '/api/uploads/1737503938308-MuddyElephant_sq.jpeg', 0, 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMywiZmlyc3RfbmFtZSI6Ik11ZGR5IiwibGFzdF9uYW1lIjoiRWxlcGhhbnQiLCJyb2xlIjoiQ3VzdG9tZXIiLCJwcm92aWRlciI6InNlbGYiLCJlbWFpbCI6Im11ZGR5ZWxlcGhhbnRAZ21haWwuY29tIiwiaWF0IjoxNzM5OTI5MjEyfQ.6_oLm-9OgOSeZX8lNfSFBgNg7gp2rVjxaLky1UEYVyE', 
    'Elephant', '$2b$10$dOxIcnN2t/LU2g2d15QfWuwMg/MnjDIZD5xnYr6ApAB7QnHlWzV0O', NULL, NULL, 'self', 'Artist', NULL, NULL, NULL, 23),
    
    (NULL, NULL, NULL, '2025-02-19 01:41:11', 'pilosa@gmail.com', 'Pilosa', '/api/uploads/1737504462601-PILOSA_web.jpeg', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNCwiZmlyc3RfbmFtZSI6IlBpbG9zYSIsImxhc3RfbmFtZSI6IlBhcm9keSIsInJvbGUiOiJDdXN0b21lciIsInByb3ZpZGVyIjoic2VsZiIsImVtYWlsIjoicGlsb3NhQGdtYWlsLmNvbSIsImlhdCI6MTczOTkyOTI3MX0.WPWRed9_rlRiCLRRg0KE7RttF262Kf67XIltkRTRnzg', 'Parody', '$2b$10$Q0co48Za8A2t9RBiQiZKD.4NLoLUHz/V72I7T6I1ng8ME7xwp7CRG', NULL, NULL, 'self', 'Artist', NULL, NULL, NULL, 24),
    (NULL, NULL, NULL, '2025-02-19 01:41:24', 'edyforey@gmail.com', 'Edy', '/api/uploads/1737504482282-EdyForey_1_DaveMacKinnon-1536x1536.jpg', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNSwiZmlyc3RfbmFtZSI6IkVkeSIsImxhc3RfbmFtZSI6IkZvcmV5Iiwicm9sZSI6IkN1c3RvbWVyIiwicHJvdmlkZXIiOiJzZWxmIiwiZW1haWwiOiJlZHlmb3JleUBnbWFpbC5jb20iLCJpYXQiOjE3Mzk5MjkyODR9.GhRwEjnn7o0NMobswRyUWVngq_ivCTIbljbIFJRUq7s', 'Forey', '$2b$10$7hFXoO8/jbedrJbsMFVZ0.BauAFQHYRhu56K9GSkLb8xlzpjmKDCm', NULL, NULL, 'self', 'Artist', NULL, NULL, NULL, 25),
    (NULL, NULL, NULL, '2025-02-19 01:41:37', 'martinmullady@gmail.com', 'Martin', '/api/uploads/1737504495143-MartinMullady_sq.jpeg', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyNiwiZmlyc3RfbmFtZSI6Ik1hcnRpbiIsImxhc3RfbmFtZSI6Ik11bGxhZHkiLCJyb2xlIjoiQ3VzdG9tZXIiLCJwcm92aWRlciI6InNlbGYiLCJlbWFpbCI6Im1hcnRpbm11bGxhZHlAZ21haWwuY29tIiwiaWF0IjoxNzM5OTI5Mjk3fQ.auSjhnPlXV8SpmxOzl-gKMBPzwfqTzgvHNr5hWGb8Bg', 'Mullady', '$2b$10$INrj2Aj0U0wbhyo1hgKpc.7DHFfY6ZrChL9us86WCcFSn6ERGEhQq', NULL, NULL, 'self', 'Artist', NULL, NULL, NULL, 26);`,
       
    `INSERT INTO Artist (artist_id, bank_account_number, bank_account_type, bank_full_name, bio, credits, first_headline_gig, genre, image_path, is_festival, links, mobile_number, music_link, name, need_help_booking, sort_code, town, user_id, verified)
     VALUES
       (1, '123456789', 'Checking', 'Ladida Ladiddy', 'La Di Da are a band from Dublin, Ireland consisting of Niamh O’Raw, Sean Lay, D. Cullen and Leon McGrane. They headline Fibber Magees, DUBLIN on Sunday 23 February 2025', 500, '2025-02-23 19:00:00', '["rock","indie"]', '/api/uploads/1737503805691-LaDiDa_sq.jpeg', 1, '{"website":"http://example.com"}', '353871234567', 'http://spotify.com/ladi-da', 'La Di Da', 0, '123456', 'Dublin', 22, 0),
       (2, '987654321', 'Savings', 'Muddy Elephant', 'Hailing from the north west, Muddy Elephant are gaining a lot of momentum thanks to a loyal fanbase. They’ve sold out shows and supported artists such as ...', 200, '2024-11-15 20:30:00', '["pop"]', '/api/uploads/1737503938308-MuddyElephant_sq.jpeg', 0, NULL, '447812345678', 'http://soundcloud.com/muddyelephant', 'Muddy Elephant', 1, '654321', 'Manchester', 23, 1),
       (3, '564738291', 'Business', 'Pilosa Parody', 'PILOSA is a Psychedelic rock project with an overarching narrative; set in a land of over-evolved sloths and anteaters, the PILOSA queendom is subject to great power struggles and philosophical debate. The Derry-based quartet, James Tomlinson, Rosa Walsh, Jack Quigg and Ryan Holmes reimagine modern life through the lenses of quirky characters and dramatic surrealist depictions of monopoly capitalism', 300, '2024-10-10 18:45:00', '["alternative"]', '/api/uploads/1737504462601-PILOSA_web.jpeg', 0, '{"facebook":"http://fb.com/indiegroup"}', '447700123456', 'http://youtube.com/pilosa', 'Pilosa', 1, '987654', 'Derry', 24, 1),
       (4, '112233445', 'Checking', 'Edy Forey', 'Hailing from Poland and France, Edy Forey consists of Edy Szewy and Guilhem Forey, now based in Edinburgh. They’ve showcased at Wide Days, Edinburgh Jazz & Blues Festival and enjoyed airplay on BBC Radio Scotland, Jazz FM, BBC London ...', 700, '2025-03-10 21:00:00', '["electronic","house"]', '/api/uploads/1737504482282-EdyForey_1_DaveMacKinnon-1536x1536.jpg', 1, '{"instagram":"http://insta.com/festivaldj"}', '447911223344', 'http://mixcloud.com/edyforey', 'Edy Forey', 1, '112233', 'Edinburgh', 25, 1),
       (5, '556677889', 'Savings', 'Martin Mullady', 'Hailing from Alloa near Stirling, Martin Mullady is a promising singer songwriter, creating masterful, three-minute pop rock songs, for fans of the likes of Stereophonics, and Foo Fighters.', 600, '2024-09-20 19:30:00', '["jazz"]', '/api/uploads/1737504495143-MartinMullady_sq.jpeg', 0, '{"spotify":"http://spotify.com/jazzensemble"}', '447733445566', 'http://bandcamp.com/martinmullady', 'Martin Mullady', 0, '778899', 'Stirling', 26, 1);`,
  
    `INSERT INTO Venue (description, image_path, is_festival, venue_address, venue_capacity, venue_city, venue_id, venue_link, venue_name, verified)
     VALUES
       ('The largest festival stage.', '/api/uploads/1737503805691-LaDiDa_sq.jpeg', 1, '123 Festival Ave', 1000, 'Glasgow', 1, 'http://mainstage.com', 'The Oakwood Lounge', 1),
       ('A small, intimate venue.', '/api/uploads/1737503938308-MuddyElephant_sq.jpeg', 0, '45 Bar Street', 150, 'Edinburgh', 2, 'http://localpub.com', 'The Castle Hotel', 1),
       (NULL, '/api/uploads/1737504462601-PILOSA_web.jpeg', 0, '678 City Center', 500, 'Aberdeen', 3, NULL, 'The Union Bar', 0),
       ('An open-air venue with a great view.', '/api/uploads/1737504482282-EdyForey_1_DaveMacKinnon-1536x1536.jpg', 0, '90 Sky Lane', 200, 'Denver', 4, 'http://rooftop.com', 'Bennigans Bar', 1),
       ('Open-air space for large events.', '/api/uploads/1737504495143-MartinMullady_sq.jpeg', 1, '456 Festival Drive', 5000, 'Wisconsin', 5, 'http://festivalgrounds.com', 'Fibber Magees', 0);`,

    `INSERT INTO Gig (artist_id, booking_fee, date, description, disclaimer, doors_time, gig_id, gig_name, image_path, is_festival, original_price, sale_price, supports, tickets_available, tickets_sold, venue_id, verified)
     VALUES
       (1, '1.25', '2025-02-23', 'New Year Celebration Gig.', 'Available!', '18:00:00', 1, 'La Di Da', '/api/uploads/1737503805691-LaDiDa_sq.jpeg', 1, '50.00', '45.00', '[{"name":"Muddy Elephant","artist_id":2},{"name":"Pilosa","artist_id":3}]', 500, 200, 5, 1),
       (2, '1.25', '2025-03-01', 'Exclusive Pub Night.', 'Available!', '20:00:00', 2, 'Muddy Elephant', '/api/uploads/1737503938308-MuddyElephant_sq.jpeg', 0, '30.00', '25.00', '[{"name":"La Di Da","artist_id":1}]', 150, 50, 2, 1),
       (3, '1.25', '2025-03-02', 'Intimate Rooftop Performance.', 'Available!', '19:00:00', 3, 'Pilosa', '/api/uploads/1737504462601-PILOSA_web.jpeg', 0, '25.00', '20.00', '[{"name":"Edy Forey","artist_id":4}]', 200, 80, 4, 0),
       (4, '1.25', '2025-03-03', 'Festival Opener.', 'Available!', '16:00:00', 4, 'Martin Mullady', '/api/uploads/1737504495143-MartinMullady_sq.jpeg', 1, '40.00', '35.00', '[{"name":"The Scarlet Cavaliers","artist_id":5},{"name":"Pilosa","artist_id":3}]', 1000, 500, 1, 1),
       (5, '1.25', '2025-03-04', 'Jazz Night at the Theater.', 'Available!', '19:30:00', 5, 'The Scarlet Cavaliers', '/api/uploads/1737505282162-Scarlet_1.jpeg', 0, '35.00', '30.00', '[{"name":"Muddy Elephant","artist_id":2}]', 500, 300, 3, 0);`
  ];

  const results = [];
  try {
    for (const query of queries) {
      const [rows] = await db.query(query);
      results.push(rows);
    }
  } catch (error) {
    console.error("Error populating table: ", error);
    throw error;
  }
  return results;
};


module.exports = {
  uploadImage,
  createTable,
  mockPopulateTable
}
