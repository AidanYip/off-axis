const db = require('../../config/db.js');
const {
  getAllVenues,
  getAllVenueNames,
  getVenueById,
  getVenueByGigId,
  createVenue,
  updateVenue,
  deleteVenue
} = require('../venueModel');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('Venue Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllVenues', () => {
    it('should return all venues from the database', async () => {
      const mockVenues = [
        { id: 1, name: 'Concert Hall', capacity: 2000, location: 'Downtown' },
        { id: 2, name: 'Stadium', capacity: 50000, location: 'West Side' },
        { id: 3, name: 'Theater', capacity: 500, location: 'Arts District' }
      ];
      
      db.query.mockResolvedValue([mockVenues]);
      
      const result = await getAllVenues();
      
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockVenues);
    });

    it('should throw an error if the database query fails', async () => {
      const dbError = new Error('Database connection failed');
      db.query.mockRejectedValue(dbError);
      
      await expect(getAllVenues()).rejects.toThrow('Database connection failed');
      
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllVenueNames', () => {
    it('should return all venue names from the database', async () => {
      const mockVenueNames = [
        { venue_id: 1, venue_name: 'Concert Hall', venue_city: 'Downtown' },
        { venue_id: 2, venue_name: 'Stadium', venue_city: 'West Side' },
        { venue_id: 3, venue_name: 'Theater', venue_city: 'Arts District' }
      ];
      
      db.query.mockResolvedValue([mockVenueNames]);
      
      const result = await getAllVenueNames();
      
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockVenueNames);
    });

    it('should throw an error if the database query fails', async () => {
      const dbError = new Error('Database connection failed');
      db.query.mockRejectedValue(dbError);
      
      await expect(getAllVenueNames()).rejects.toThrow('Database connection failed');
      
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('getVenueById', () => {
    it('should return the venue with the given ID from the database', async () => {
      const mockVenue = { id: 1, name: 'Concert Hall', capacity: 2000, location: 'Downtown' };
      
      db.query.mockResolvedValue([[mockVenue]]);
      
      const result = await getVenueById(1);
      
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockVenue]);
    });

    it('should throw an error if the database query fails', async () => {
      const dbError = new Error('Database connection failed');
      db.query.mockRejectedValue(dbError);
      
      await expect(getVenueById(1)).rejects.toThrow('Database connection failed');
      
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('getVenueByGigId', () => {
    it('should return the venue associated with the given gig ID from the database', async () => {
      const mockVenue = { venue_id: 1, venue_name: 'Concert Hall', venue_address: '123 Main St', venue_description: 'A large concert hall', image_path: '/images/concert-hall.jpg' };
      
      db.query.mockResolvedValue([[mockVenue]]);
      
      const result = await getVenueByGigId(1);
      
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockVenue]);
    });

    it('should throw an error if the database query fails', async () => {
      const dbError = new Error('Database connection failed');
      db.query.mockRejectedValue(dbError);
      
      await expect(getVenueByGigId(1)).rejects.toThrow('Database connection failed');
      
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('createVenue', () => {
    it('should create a new venue in the database', async () => {
      const mockVenue = { insertId: 1 };
      
      db.query.mockResolvedValue([mockVenue]);
      
      const result = await createVenue('Concert Hall', 2000, 'Downtown', '123 Main St', 'http://example.com', 'A large concert hall', true, true, '/images/concert-hall.jpg');
      
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockVenue);
    });

    it('should throw an error if the database query fails', async () => {
      const dbError = new Error('Database connection failed');
      db.query.mockRejectedValue(dbError);
      
      await expect(createVenue('Concert Hall', 2000, 'Downtown', '123 Main St', 'http://example.com', 'A large concert hall', true, true, '/images/concert-hall.jpg')).rejects.toThrow('Database connection failed');
      
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateVenue', () => {
    it('should update the venue with the given ID in the database', async () => {
      const mockResult = { affectedRows: 1 };
      
      db.query.mockResolvedValue([mockResult]);
      
      const result = await updateVenue(1, 'Concert Hall', 2000, '123 Main St', 'http://example.com', 'A large concert hall', true, true);
      
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
    });

    it('should throw an error if the database query fails', async () => {
      const dbError = new Error('Database connection failed');
      db.query.mockRejectedValue(dbError);
      
      await expect(updateVenue(1, 'Concert Hall', 2000, '123 Main St', 'http://example.com', 'A large concert hall', true, true)).rejects.toThrow('Database connection failed');
      
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteVenue', () => {
    it('should delete the venue with the given ID from the database', async () => {
      const mockResult = { affectedRows: 1 };
      
      db.query.mockResolvedValue([mockResult]);
      
      const result = await deleteVenue(1);
      
      expect(db.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
    });

    it('should throw an error if the database query fails', async () => {
      const dbError = new Error('Database connection failed');
      db.query.mockRejectedValue(dbError);
      
      await expect(deleteVenue(1)).rejects.toThrow('Database connection failed');
      
      expect(db.query).toHaveBeenCalledTimes(1);
    });
  });
});
