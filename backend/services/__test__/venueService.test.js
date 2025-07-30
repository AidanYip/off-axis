jest.mock('../../models/venueModel', () => ({
  getAllVenues: jest.fn(),
  getAllVenueNames: jest.fn(),
  getVenueById: jest.fn(),
  getVenueByGigId: jest.fn(),
  createVenue: jest.fn(),
  updateVenue: jest.fn(),
  deleteVenue: jest.fn()
}));

const venueService = require('../venueService');
const venueModel = require('../../models/venueModel');

describe('venueService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllVenues should return result from venueModel.getAllVenues', async () => {
    const mockResult = [{ id: 1, name: 'Venue 1' }];
    venueModel.getAllVenues.mockResolvedValue(mockResult);

    const result = await venueService.getAllVenues();
    expect(result).toEqual(mockResult);
    expect(venueModel.getAllVenues).toHaveBeenCalledTimes(1);
  });

  test('getAllVenueNames should return result from venueModel.getAllVenueNames', async () => {
    const mockResult = [{ id: 1, name: 'Venue 1' }];
    venueModel.getAllVenueNames.mockResolvedValue(mockResult);

    const result = await venueService.getAllVenueNames();
    expect(result).toEqual(mockResult);
    expect(venueModel.getAllVenueNames).toHaveBeenCalledTimes(1);
  });

  test('getVenueById should return result from venueModel.getVenueById', async () => {
    const mockResult = { id: 1, name: 'Venue 1' };
    const req = { venue_id: 1 };
    venueModel.getVenueById.mockResolvedValue(mockResult);

    const result = await venueService.getVenueById(req);
    expect(result).toEqual(mockResult);
    expect(venueModel.getVenueById).toHaveBeenCalledWith(req.venue_id);
    expect(venueModel.getVenueById).toHaveBeenCalledTimes(1);
  });

  test('getVenueByGigId should return result from venueModel.getVenueByGigId', async () => {
    const mockResult = { id: 1, name: 'Venue 1' };
    const req = { gig_id: 1 };
    venueModel.getVenueByGigId.mockResolvedValue(mockResult);

    const result = await venueService.getVenueByGigId(req);
    expect(result).toEqual(mockResult);
    expect(venueModel.getVenueByGigId).toHaveBeenCalledWith(req.gig_id);
    expect(venueModel.getVenueByGigId).toHaveBeenCalledTimes(1);
  });

  test('createVenue should return result from venueModel.createVenue', async () => {
    const mockResult = { success: true };
    const req = {
      venue_name: 'Venue 1',
      venue_capacity: 1000,
      venue_city: 'City 1',
      venue_address: 'Address 1',
      venue_link: 'http://venue1.com',
      description: 'Description 1',
      image_path: 'path/to/image.jpg'
    };
    venueModel.createVenue.mockResolvedValue(mockResult);

    const result = await venueService.createVenue(req);
    expect(result).toEqual(mockResult);
    expect(venueModel.createVenue).toHaveBeenCalledWith(
      req.venue_name,
      req.venue_capacity,
      req.venue_city,
      req.venue_address,
      req.venue_link,
      req.description,
      0, // is_festival
      1, // verified
      req.image_path
    );
    expect(venueModel.createVenue).toHaveBeenCalledTimes(1);
  });

  test('updateVenue should return result from venueModel.updateVenue', async () => {
    const mockResult = { success: true };
    const req = {
      venue_id: 1,
      venue_name: 'Updated Venue',
      venue_capacity: 2000,
      venue_address: 'Updated Address',
      venue_link: 'http://updatedvenue.com',
      description: 'Updated Description',
      is_festival: 1,
      verified: 0
    };
    venueModel.updateVenue.mockResolvedValue(mockResult);

    const result = await venueService.updateVenue(req);
    expect(result).toEqual(mockResult);
    expect(venueModel.updateVenue).toHaveBeenCalledWith(
      req.venue_id,
      req.venue_name,
      req.venue_capacity,
      req.venue_address,
      req.venue_link,
      req.description,
      req.is_festival,
      req.verified
    );
    expect(venueModel.updateVenue).toHaveBeenCalledTimes(1);
  });

  test('deleteVenue should return result from venueModel.deleteVenue', async () => {
    const mockResult = { success: true };
    const req = { venue_id: 1 };
    venueModel.deleteVenue.mockResolvedValue(mockResult);

    const result = await venueService.deleteVenue(req);
    expect(result).toEqual(mockResult);
    expect(venueModel.deleteVenue).toHaveBeenCalledWith(req.venue_id);
    expect(venueModel.deleteVenue).toHaveBeenCalledTimes(1);
  });
});
