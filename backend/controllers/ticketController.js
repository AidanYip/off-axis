const ticketService = require('../services/ticketService');
const { buildResponse } = require('../helpers/responseHelper');

const getAllTickets = async (req, res) => {
  try {
    const result = await ticketService.getAllTickets();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getTicketById = async (req, res) => {
  try {
    const { ticket_id, gig_id } = req.body;

    if (!ticket_id || !gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await ticketService.getTicketById(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const createTicket = async (req, res) => {
  try {
    const { email, gig_id, original_price, coupon_id, final_price } = req.body;

    if (!email || !gig_id || !original_price || !coupon_id || !final_price) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await ticketService.createTicket(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateTicket = async (req, res) => {
  try {
    const { ticket_id, email, gig_id, original_price, coupon_id, final_price } = req.body;

    if (!ticket_id || !email || !gig_id || !original_price || !coupon_id || !final_price) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await ticketService.updateTicket(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};


const deleteTicket = async (req, res) => {
  try {
    const { ticket_id, gig_id } = req.body;

    if (!ticket_id || !gig_id) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await ticketService.deleteTicket(req.body);

    if (!result || result.affectedRows === 0){
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

module.exports = {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket
};