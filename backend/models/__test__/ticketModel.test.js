const ticketModel = require('../ticketModel');
const db = require('../../config/db');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('ticketModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllTickets should return all tickets', async () => {
    const mockTickets = [
      { ticket_id: 1, email: 'test1@example.com', gig_id: 1, original_price: 50, coupon_id: 1, final_price: 45 },
      { ticket_id: 2, email: 'test2@example.com', gig_id: 2, original_price: 30, coupon_id: 2, final_price: 25 },
    ];
    db.query.mockResolvedValue([mockTickets]);

    const result = await ticketModel.getAllTickets();
    expect(result).toEqual(mockTickets);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getTicketById should return ticket by id', async () => {
    const mockTicket = [
      { ticket_id: 1, email: 'test1@example.com', gig_id: 1, original_price: 50, coupon_id: 1, final_price: 45 }
    ];
    db.query.mockResolvedValue([mockTicket]);

    const result = await ticketModel.getTicketById(1, 1);
    expect(result).toEqual(mockTicket);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);
  });

  test('createTicket should insert a new ticket', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await ticketModel.createTicket('test@example.com', 1, 50, 1, 45);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['test@example.com', 1, 50, 1, 45]);
  });

  test('updateTicket should update an existing ticket', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await ticketModel.updateTicket(1, 'test@example.com', 1, 50, 1, 45);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['test@example.com', 1, 50, 1, 45, 1]);
  });

  test('deleteTicket should delete a ticket by id', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await ticketModel.deleteTicket(1, 1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1]);
  });
});
