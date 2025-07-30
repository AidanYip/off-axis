const ticketModel = require('../models/ticketModel');

const getAllTickets = async () => {
  const result = ticketModel.getAllTickets();
  return result;
};

const getTicketById = async (req) => {
  const { ticket_id, gig_id } = req;

  const result = ticketModel.getTicketById(ticket_id, gig_id);
  return result;
}

const createTicket = async (req) => {
  const { email, gig_id, original_price, coupon_id, final_price } = req;

  const result = await ticketModel.createTicket(email, gig_id, original_price, coupon_id, final_price);
  return result;
};

const updateTicket = async (req) => {
  const { ticket_id, email, gig_id, original_price, coupon_id, final_price } = req;

  const result = await ticketModel.updateTicket(ticket_id, email, gig_id, original_price, coupon_id, final_price);
  return result;
};

const deleteTicket = async (req) => {
  const { ticket_id, gig_id } = req;

  const result = await ticketModel.deleteTicket(ticket_id, gig_id);
  return result;
}

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
}