const db = require('../config/db');

const getAllTickets = async () => {
  const query = ` 
    SELECT *
    FROM Ticket
  ;`;
        
  const [rows] = await db.query(query);
  return rows;
};

const getTicketById = async (ticket_id, gig_id) => {
  const query = `
    SELECT *
    FROM Ticket
    WHERE ticket_id = ? AND gig_id = ?
  ;`;

  const [rows] = await db.query(query, [ticket_id, gig_id]);
  return rows;
};

const createTicket = async (email, gig_id, original_price, coupon_id, final_price) => {
  const query = `
    INSERT INTO Ticket
      (email, gig_id, original_price, coupon_id, final_price)
    VALUES 
      (?, ?, ?, ?, ?)
  ;`;

  const [rows] = await db.query(query, [email, gig_id, original_price, coupon_id, final_price]);
  return rows;
};

const updateTicket = async (ticket_id, email, gig_id, original_price, coupon_id, final_price) => { 
  const query = `
    UPDATE Ticket
    SET
      email = ?, 
      gig_id = ?, 
      original_price = ?, 
      coupon_id = ?, 
      final_price = ?
    WHERE ticket_id = ?
  ;`;

  const [rows] = await db.query(query, [email, gig_id, original_price, coupon_id, final_price, ticket_id]);
  return rows;
};

const deleteTicket = async (ticket_id, gig_id) => {
  const query = `
    DELETE FROM Ticket
    WHERE ticket_id = ? AND gig_id = ?
  ;`;

  const [result] = await db.query(query, [ticket_id, gig_id]);
  return result;
};


module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
}
