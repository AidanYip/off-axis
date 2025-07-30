jest.mock('../../models/gigModel', () => ({
    getAllGigs: jest.fn(),
    getAllFestivals: jest.fn(),
    getSupportsByGigId: jest.fn(),
    getGigByArtistId: jest.fn(),
    getGigById: jest.fn(),
    getGigByGigId: jest.fn(),
    getTotalPriceOfGigs: jest.fn(),
    getGigCartInfo: jest.fn(),
    getGigsCheckoutInfo: jest.fn(),
    createGig: jest.fn(),
    updateGig: jest.fn(),
    deleteGig: jest.fn(),
    setSupport: jest.fn(),
    updateSupport: jest.fn(),
    getAllSupportRequests: jest.fn()
  }));
  
  const gigService = require('../gigService');
  const gigModel = require('../../models/gigModel');
  
  describe('Gig Service Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getAllGigs', () => {
      it('should call gigModel.getAllGigs and return the result', async () => {
        const mockGigs = [{ id: 1, name: 'Test Gig' }];
        gigModel.getAllGigs.mockResolvedValue(mockGigs);
  
        const result = await gigService.getAllGigs();
  
        expect(gigModel.getAllGigs).toHaveBeenCalled();
        expect(result).toEqual(mockGigs);
      });
    });
  
    describe('getAllFestivals', () => {
      it('should call gigModel.getAllFestivals and return the result', async () => {
        const mockFestivals = [{ id: 1, name: 'Test Festival' }];
        gigModel.getAllFestivals.mockResolvedValue(mockFestivals);
  
        const result = await gigService.getAllFestivals();
  
        expect(gigModel.getAllFestivals).toHaveBeenCalled();
        expect(result).toEqual(mockFestivals);
      });
    });
  
    describe('getSupportsByGigId', () => {
      it('should call gigModel.getSupportsByGigId with the correct gig_id and return the result', async () => {
        const mockSupports = [{ id: 1, artist_name: 'Support Band' }];
        const req = { gig_id: 1 };
        gigModel.getSupportsByGigId.mockResolvedValue(mockSupports);
  
        const result = await gigService.getSupportsByGigId(req);
  
        expect(gigModel.getSupportsByGigId).toHaveBeenCalledWith(req.gig_id);
        expect(result).toEqual(mockSupports);
      });
    });
  
    describe('getGigByArtistId', () => {
      it('should call gigModel.getGigByArtistId with the correct artist_id and return the result', async () => {
        const mockGigs = [{ id: 1, name: 'Artist Gig' }];
        const req = { artist_id: 2 };
        gigModel.getGigByArtistId.mockResolvedValue(mockGigs);
  
        const result = await gigService.getGigByArtistId(req);
  
        expect(gigModel.getGigByArtistId).toHaveBeenCalledWith(req.artist_id);
        expect(result).toEqual(mockGigs);
      });
    });
  
    describe('getGigById', () => {
      it('should call gigModel.getGigById with the correct parameters and return the result', async () => {
        const mockGig = { id: 1, name: 'Specific Gig' };
        const req = { venue_id: 3, artist_id: 2, gig_id: 1 };
        gigModel.getGigById.mockResolvedValue(mockGig);
  
        const result = await gigService.getGigById(req);
  
        expect(gigModel.getGigById).toHaveBeenCalledWith(req.venue_id, req.artist_id, req.gig_id);
        expect(result).toEqual(mockGig);
      });
    });
  
    describe('getGigByGigId', () => {
      it('should call gigModel.getGigByGigId with the correct gig_id and return the result', async () => {
        const mockGig = { id: 1, name: 'Gig By ID' };
        const req = { gig_id: 1 };
        gigModel.getGigByGigId.mockResolvedValue(mockGig);
  
        const result = await gigService.getGigByGigId(req);
  
        expect(gigModel.getGigByGigId).toHaveBeenCalledWith(req.gig_id);
        expect(result).toEqual(mockGig);
      });
    });
  
    describe('getTotalPriceOfGigs', () => {
      it('should call gigModel.getTotalPriceOfGigs with the correct gig_ids and return the result', async () => {
        const mockTotal = { total: 99.99 };
        const req = { gig_ids: [1, 2, 3] };
        gigModel.getTotalPriceOfGigs.mockResolvedValue(mockTotal);
  
        const result = await gigService.getTotalPriceOfGigs(req);
  
        expect(gigModel.getTotalPriceOfGigs).toHaveBeenCalledWith(req.gig_ids);
        expect(result).toEqual(mockTotal);
      });
    });
  
    describe('getGigCartInfo', () => {
      it('should call gigModel.getGigCartInfo with the correct gig_id and return the result', async () => {
        const mockCartInfo = { id: 1, price: 25.99, name: 'Gig in Cart' };
        const req = { gig_id: 1 };
        gigModel.getGigCartInfo.mockResolvedValue(mockCartInfo);
  
        const result = await gigService.getGigCartInfo(req);
  
        expect(gigModel.getGigCartInfo).toHaveBeenCalledWith(req.gig_id);
        expect(result).toEqual(mockCartInfo);
      });
    });
  
    describe('getGigsCheckoutInfo', () => {
      it('should call gigModel.getGigsCheckoutInfo with the correct gig_ids and return the result', async () => {
        const mockCheckoutInfo = [{ id: 1, price: 25.99 }, { id: 2, price: 30.50 }];
        const req = { gig_ids: [1, 2] };
        gigModel.getGigsCheckoutInfo.mockResolvedValue(mockCheckoutInfo);
  
        const result = await gigService.getGigsCheckoutInfo(req);
  
        expect(gigModel.getGigsCheckoutInfo).toHaveBeenCalledWith(req.gig_ids);
        expect(result).toEqual(mockCheckoutInfo);
      });
    });
  
    describe('createGig', () => {
      it('should call gigModel.createGig with the correct parameters including calculated values and return the result', async () => {
        const mockResult = { id: 1, name: 'New Gig' };
        const req = {
          artist_id: 2,
          venue_id: 3,
          date: '2025-04-01',
          doors_time: '19:00',
          description: 'A great gig',
          original_price: 25.99,
          tickets_available: 200,
          gig_name: 'Awesome Band Live',
          image_path: '/images/gig.jpg'
        };
  
        gigModel.createGig.mockResolvedValue(mockResult);
  
        const result = await gigService.createGig(req);
  
        // Expected calculated/default values
        const expectedSalePrice = req.original_price;
        const expectedIsFestival = 0;
        const expectedBookingFee = 1.25;
  
        expect(gigModel.createGig).toHaveBeenCalledWith(
          req.artist_id,
          req.venue_id,
          expectedIsFestival,
          req.date,
          req.doors_time,
          req.description,
          req.original_price,
          expectedSalePrice,
          req.tickets_available,
          req.gig_name,
          expectedBookingFee,
          req.image_path
        );
        expect(result).toEqual(mockResult);
      });
    });
  
    describe('updateGig', () => {
      it('should call gigModel.updateGig with the correct parameters including the calculated sale_price and return the result', async () => {
        const mockResult = { id: 1, name: 'Updated Gig' };
        const req = {
          gig_id: 1,
          venue_id: 3,
          date: '2025-04-01',
          doors_time: '19:30',
          description: 'An updated gig',
          original_price: 29.99,
          tickets_available: 180,
          gig_name: 'Awesome Band Live - Updated',
          image_path: '/images/updated-gig.jpg'
        };
  
        gigModel.updateGig.mockResolvedValue(mockResult);
  
        const result = await gigService.updateGig(req);
  
        // Expected calculated values
        const expectedSalePrice = req.original_price;
  
        expect(gigModel.updateGig).toHaveBeenCalledWith(
          req.venue_id,
          req.date,
          req.doors_time,
          req.description,
          expectedSalePrice,
          req.tickets_available,
          req.gig_name,
          req.image_path,
          req.gig_id
        );
        expect(result).toEqual(mockResult);
      });
    });
  
    describe('deleteGig', () => {
      it('should call gigModel.deleteGig with the correct parameters and return the result', async () => {
        const mockResult = { success: true };
        const req = { venue_id: 3, artist_id: 2, gig_id: 1 };
        gigModel.deleteGig.mockResolvedValue(mockResult);
  
        const result = await gigService.deleteGig(req);
  
        expect(gigModel.deleteGig).toHaveBeenCalledWith(req.venue_id, req.artist_id, req.gig_id);
        expect(result).toEqual(mockResult);
      });
    });
  
    describe('setSupport', () => {
      it('should call gigModel.setSupport with the correct parameters including default values and return the result', async () => {
        const mockResult = { success: true };
        const req = { supports: 5, gig_id: 1 };
        gigModel.setSupport.mockResolvedValue(mockResult);
  
        const result = await gigService.setSupport(req);
  
        // Expected default values
        const expectedResponded = 0;
        const expectedAccepted = 0;
        const expectedArtistId = req.supports;
  
        expect(gigModel.setSupport).toHaveBeenCalledWith(
          expectedArtistId,
          req.gig_id,
          expectedResponded,
          expectedAccepted
        );
        expect(result).toEqual(mockResult);
      });
    });
  
    describe('updateSupport', () => {
      it('should call gigModel.updateSupport with the correct parameters and return the result', async () => {
        const mockResult = { success: true };
        const req = { responded: 1, accepted: 1, artist_id: 5, gig_id: 1 };
        gigModel.updateSupport.mockResolvedValue(mockResult);
  
        const result = await gigService.updateSupport(req);
  
        expect(gigModel.updateSupport).toHaveBeenCalledWith(
          req.responded,
          req.accepted,
          req.artist_id,
          req.gig_id
        );
        expect(result).toEqual(mockResult);
      });
    });
  
    describe('getAllSupportRequests', () => {
      it('should call gigModel.getAllSupportRequests with the correct artist_id and return the result', async () => {
        const mockRequests = [{ gig_id: 1, artist_id: 5, responded: 0 }];
        const req = { artist_id: 5 };
        gigModel.getAllSupportRequests.mockResolvedValue(mockRequests);
  
        const result = await gigService.getAllSupportRequests(req);
  
        expect(gigModel.getAllSupportRequests).toHaveBeenCalledWith(req.artist_id);
        expect(result).toEqual(mockRequests);
      });
    });
  });
  