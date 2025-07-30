const gigModel = require('../gigModel');
const db = require('../../config/db');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('Gig Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllGigs should return all gigs', async () => {
    const mockGigs = [{ gig_id: 1, gig_name: 'Gig 1', venue_city: 'City 1', image_path: 'path1' }];
    db.query.mockResolvedValue([mockGigs]);

    const result = await gigModel.getAllGigs();
    expect(result).toEqual(mockGigs);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getAllFestivals should return all festivals', async () => {
    const mockFestivals = [{ gig_id: 1, gig_name: 'Festival 1', image_path: 'path1' }];
    db.query.mockResolvedValue([mockFestivals]);

    const result = await gigModel.getAllFestivals();
    expect(result).toEqual(mockFestivals);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getSupportsByGigId should return supports by gig id', async () => {
    const mockSupports = [{ supports: 'Support 1' }];
    db.query.mockResolvedValue([mockSupports]);

    const result = await gigModel.getSupportsByGigId(1);
    expect(result).toEqual(mockSupports);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('getGigByArtistId should return gigs by artist id', async () => {
    const mockGigs = [{ gig_id: 1, artist_id: 1, gig_name: 'Gig 1', supports: 'Support 1', date: '2023-01-01' }];
    db.query.mockResolvedValue([mockGigs]);

    const result = await gigModel.getGigByArtistId(1);
    expect(result).toEqual(mockGigs);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('getGigById should return gig by id', async () => {
    const mockGig = [{ gig_id: 1, artist_id: 1, venue_id: 1 }];
    db.query.mockResolvedValue([mockGig]);

    const result = await gigModel.getGigById(1, 1, 1);
    expect(result).toEqual(mockGig);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1, 1]);
  });

  test('getGigByGigId should return gig by gig id', async () => {
    const mockGig = [{ gig_id: 1, gig_name: 'Gig 1', venue_id: 1, date: '2023-01-01', doors_time: '18:00', original_price: 50, sale_price: 40, booking_fee: 5, tickets_available: 100, tickets_sold: 50, disclaimer: 'None', description: 'Description', venue_name: 'Venue 1', image_path: 'path1' }];
    db.query.mockResolvedValue([mockGig]);

    const result = await gigModel.getGigByGigId(1);
    expect(result).toEqual(mockGig);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('getTotalPriceOfGigs should return total price of gigs', async () => {
    const mockPrices = [{ gig_id: 1, total_price: 45 }];
    db.query.mockResolvedValue([mockPrices]);

    const result = await gigModel.getTotalPriceOfGigs([1]);
    expect(result).toEqual(mockPrices);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [[1]]);
  });

  test('getGigCartInfo should return gig cart info', async () => {
    const mockCartInfo = { image_path: 'path1', gig_name: 'Gig 1', booking_fee: 5, sale_price: 40 };
    db.query.mockResolvedValue([mockCartInfo]);

    const result = await gigModel.getGigCartInfo(1);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('getGigsCheckoutInfo should return gigs checkout info', async () => {
    const mockCheckoutInfo = [{ gig_name: 'Gig 1', sale_price: 40, booking_fee: 5, date: '2023-01-01' }];
    db.query.mockResolvedValue([mockCheckoutInfo]);

    const result = await gigModel.getGigsCheckoutInfo([1]);
    expect(result).toEqual(mockCheckoutInfo);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [[1]]);
  });

  test('createGig should create a new gig', async () => {
    const mockResponse = { insertId: 1 };
    db.query.mockResolvedValue([mockResponse]);

    const result = await gigModel.createGig(1, 1, 0, '2023-01-01', '18:00', 'Description', 50, 40, 100, 'Gig 1', 5, 'path1');
    expect(result).toEqual(mockResponse);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1, 0, '2023-01-01', '18:00', 'Description', 50, 40, 100, 'Gig 1', 5, 'path1']);
  });

  test('updateGig should update an existing gig', async () => {
    const mockResponse = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResponse]);

    const result = await gigModel.updateGig(1, '2023-01-01', '18:00', 'Description', 40, 100, 'Gig 1', 'path1', 1);
    expect(result).toEqual(mockResponse);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, '2023-01-01', '18:00', 'Description', 40, 100, 'Gig 1', 'path1', 1]);
  });

  test('deleteGig should delete a gig', async () => {
    const mockResponse = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResponse]);

    const result = await gigModel.deleteGig(1, 1, 1);
    expect(result).toEqual(mockResponse);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1, 1]);
  });

  test('setSupport should set support for a gig', async () => {
    const mockResponse = { insertId: 1 };
    db.query.mockResolvedValue([mockResponse]);

    const result = await gigModel.setSupport(1, 1, 1, 1);
    expect(result).toEqual(mockResponse);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1, 1, 1]);
  });

  test('updateSupport should update support for a gig', async () => {
    const mockResponse = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResponse]);

    const result = await gigModel.updateSupport(1, 1, 1, 1);
    expect(result).toEqual(mockResponse);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 1, 1, 1]);
  });

  test('getAllSupportRequests should return all support requests for an artist', async () => {
    const mockRequests = [{ artist_id: 1, gig_id: 1, gig_name: 'Gig 1' }];
    db.query.mockResolvedValue([mockRequests]);

    const result = await gigModel.getAllSupportRequests(1);
    expect(result).toEqual(mockRequests);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });
});
