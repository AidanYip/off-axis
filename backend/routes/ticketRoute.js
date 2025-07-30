const express = require('express');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

router.get('/getAllTickets', ticketController.getAllTickets);
router.post('/getTicketById', ticketController.getTicketById);
router.post('/createTicket', ticketController.createTicket);
router.post('/updateTicket', ticketController.updateTicket);
router.post('/deleteTicket', ticketController.deleteTicket);

module.exports = router;
