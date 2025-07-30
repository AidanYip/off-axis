jest.mock('../../models/adminModel', () => ({
  getAllArtists: jest.fn(),
  getAllArtistApplications: jest.fn(),
  getArtistById: jest.fn(),
  updateArtist: jest.fn(),
  deleteArtist: jest.fn(),
  approveArtist: jest.fn(),
  getAllUpcomingGigsArtistInfo: jest.fn(),
  getAllGigDraftsArtistInfo: jest.fn(),
  getAllPastGigsArtistInfo: jest.fn(),
  getGigByGigId: jest.fn(),
  updateGig: jest.fn(),
  approveGig: jest.fn(),
  deleteGig: jest.fn(),
  getAllUpcomingFestivals: jest.fn(),
  getAllPastFestivals: jest.fn(),
  getFestivalByGigId: jest.fn(),
  updateFestival: jest.fn(),
  approveFestival: jest.fn(),
  deleteFestival: jest.fn()
}));

const adminService = require('../adminService');
const adminModel = require('../../models/adminModel');

describe('Admin Service - Artists', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllArtists should call adminModel.getAllArtists and return the result', async () => {
    const mockArtists = [{ id: 1, name: 'Artist 1' }, { id: 2, name: 'Artist 2' }];
    adminModel.getAllArtists.mockResolvedValue(mockArtists);

    const result = await adminService.getAllArtists();
    
    expect(adminModel.getAllArtists).toHaveBeenCalled();
    expect(result).toEqual(mockArtists);
  });

  test('getAllArtistApplications should call adminModel.getAllArtistApplications and return the result', async () => {
    const mockApplications = [{ id: 1, name: 'Artist 1' }, { id: 2, name: 'Artist 2' }];
    adminModel.getAllArtistApplications.mockResolvedValue(mockApplications);

    const result = await adminService.getAllArtistApplications();
    
    expect(adminModel.getAllArtistApplications).toHaveBeenCalled();
    expect(result).toEqual(mockApplications);
  });

  test('getArtistById should call adminModel.getArtistById with correct ID and return the result', async () => {
    const mockArtist = { id: 1, name: 'Artist 1' };
    adminModel.getArtistById.mockResolvedValue(mockArtist);
    const req = { artist_id: 1 };

    const result = await adminService.getArtistById(req);
    
    expect(adminModel.getArtistById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockArtist);
  });

  test('updateArtist should call adminModel.updateArtist with correct parameters and return the result', async () => {
    const mockUpdateResult = { affectedRows: 1 };
    adminModel.updateArtist.mockResolvedValue(mockUpdateResult);
    
    const req = {
      name: 'Updated Name',
      town: 'London',
      music_link: 'https://music.example.com',
      mobile_number: '1234567890',
      genre: 'Rock',
      links: 'https://social.example.com',
      bio: 'Artist bio',
      image_path: '/images/artist.jpg',
      bank_full_name: 'John Doe',
      bank_account_type: 'Checking',
      bank_account_number: '12345678',
      sort_code: '123456',
      verified: 1,
      artist_id: 1
    };

    const result = await adminService.updateArtist(req);
    
    expect(adminModel.updateArtist).toHaveBeenCalledWith(
      'Updated Name',
      'London',
      'https://music.example.com',
      '1234567890',
      'Rock',
      'https://social.example.com',
      'Artist bio',
      '/images/artist.jpg',
      'John Doe',
      'Checking',
      '12345678',
      '123456',
      1,
      1
    );
    expect(result).toEqual(mockUpdateResult);
  });

  test('deleteArtist should call adminModel.deleteArtist with correct ID and return the result', async () => {
    const mockDeleteResult = { affectedRows: 1 };
    adminModel.deleteArtist.mockResolvedValue(mockDeleteResult);
    const req = { artist_id: 1 };

    const result = await adminService.deleteArtist(req);
    
    expect(adminModel.deleteArtist).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockDeleteResult);
  });

  test('approveArtist should call adminModel.approveArtist with correct ID and return the result', async () => {
    const mockApproveResult = { affectedRows: 1 };
    adminModel.approveArtist.mockResolvedValue(mockApproveResult);
    const req = { artist_id: 1 };

    const result = await adminService.approveArtist(req);
    
    expect(adminModel.approveArtist).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockApproveResult);
  });
});

describe('Admin Service - Gigs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUpcomingGigsArtistInfo should call adminModel.getAllUpcomingGigsArtistInfo and return the result', async () => {
    const mockGigs = [{ id: 1, gig_name: 'Gig 1' }, { id: 2, gig_name: 'Gig 2' }];
    adminModel.getAllUpcomingGigsArtistInfo.mockResolvedValue(mockGigs);

    const result = await adminService.getAllUpcomingGigsArtistInfo();
    
    expect(adminModel.getAllUpcomingGigsArtistInfo).toHaveBeenCalled();
    expect(result).toEqual(mockGigs);
  });

  test('getAllGigDraftsArtistInfo should call adminModel.getAllGigDraftsArtistInfo and return the result', async () => {
    const mockDrafts = [{ id: 1, gig_name: 'Draft 1' }, { id: 2, gig_name: 'Draft 2' }];
    adminModel.getAllGigDraftsArtistInfo.mockResolvedValue(mockDrafts);

    const result = await adminService.getAllGigDraftsArtistInfo();
    
    expect(adminModel.getAllGigDraftsArtistInfo).toHaveBeenCalled();
    expect(result).toEqual(mockDrafts);
  });

  test('getAllPastGigsArtistInfo should call adminModel.getAllPastGigsArtistInfo and return the result', async () => {
    const mockPastGigs = [{ id: 1, gig_name: 'Past Gig 1' }, { id: 2, gig_name: 'Past Gig 2' }];
    adminModel.getAllPastGigsArtistInfo.mockResolvedValue(mockPastGigs);

    const result = await adminService.getAllPastGigsArtistInfo();
    
    expect(adminModel.getAllPastGigsArtistInfo).toHaveBeenCalled();
    expect(result).toEqual(mockPastGigs);
  });

  test('getGigByGigId should call adminModel.getGigByGigId with correct ID and return the result', async () => {
    const mockGig = { id: 1, gig_name: 'Gig 1' };
    adminModel.getGigByGigId.mockResolvedValue(mockGig);
    const req = { gig_id: 1 };

    const result = await adminService.getGigByGigId(req);
    
    expect(adminModel.getGigByGigId).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockGig);
  });

  test('updateGig should call adminModel.updateGig with correct parameters and return the result', async () => {
    const mockUpdateResult = { affectedRows: 1 };
    adminModel.updateGig.mockResolvedValue(mockUpdateResult);
    
    const req = {
      gig_id: 1,
      venue_id: 2,
      date: '2025-05-01',
      doors_time: '19:00',
      description: 'Updated gig description',
      original_price: 25.00,
      tickets_available: 200,
      gig_name: 'Updated Gig Name',
      verified: 1,
      image_path: '/images/gig.jpg'
    };

    const result = await adminService.updateGig(req);
    
    expect(adminModel.updateGig).toHaveBeenCalledWith(
      2,
      '2025-05-01',
      '19:00',
      'Updated gig description',
      25.00,
      200,
      'Updated Gig Name',
      '/images/gig.jpg',
      1,
      1
    );
    expect(result).toEqual(mockUpdateResult);
  });

  test('approveGig should call adminModel.approveGig with correct ID and return the result', async () => {
    const mockApproveResult = { affectedRows: 1 };
    adminModel.approveGig.mockResolvedValue(mockApproveResult);
    const req = { gig_id: 1 };

    const result = await adminService.approveGig(req);
    
    expect(adminModel.approveGig).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockApproveResult);
  });

  test('deleteGig should call adminModel.deleteGig with correct ID and return the result', async () => {
    const mockDeleteResult = { affectedRows: 1 };
    adminModel.deleteGig.mockResolvedValue(mockDeleteResult);
    const req = { gig_id: 1 };

    const result = await adminService.deleteGig(req);
    
    expect(adminModel.deleteGig).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockDeleteResult);
  });
});

describe('Admin Service - Festivals', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUpcomingFestivals should call adminModel.getAllUpcomingFestivals and return the result', async () => {
    const mockFestivals = [{ id: 1, gig_name: 'Festival 1' }, { id: 2, gig_name: 'Festival 2' }];
    adminModel.getAllUpcomingFestivals.mockResolvedValue(mockFestivals);

    const result = await adminService.getAllUpcomingFestivals();
    
    expect(adminModel.getAllUpcomingFestivals).toHaveBeenCalled();
    expect(result).toEqual(mockFestivals);
  });

  test('getAllPastFestivals should call adminModel.getAllPastFestivals and return the result', async () => {
    const mockPastFestivals = [{ id: 1, gig_name: 'Past Festival 1' }, { id: 2, gig_name: 'Past Festival 2' }];
    adminModel.getAllPastFestivals.mockResolvedValue(mockPastFestivals);

    const result = await adminService.getAllPastFestivals();
    
    expect(adminModel.getAllPastFestivals).toHaveBeenCalled();
    expect(result).toEqual(mockPastFestivals);
  });

  test('getFestivalByGigId should call adminModel.getFestivalByGigId with correct ID and return the result', async () => {
    const mockFestival = { id: 1, gig_name: 'Festival 1' };
    adminModel.getFestivalByGigId.mockResolvedValue(mockFestival);
    const req = { gig_id: 1 };

    const result = await adminService.getFestivalByGigId(req);
    
    expect(adminModel.getFestivalByGigId).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockFestival);
  });

  test('createFestival should be defined', async () => {
    // Just checking the function exists
    expect(typeof adminService.createFestival).toBe('function');
  });

  test('updateFestival should call adminModel.updateFestival with correct parameters and return the result', async () => {
    const mockUpdateResult = { affectedRows: 1 };
    adminModel.updateFestival.mockResolvedValue(mockUpdateResult);
    
    const req = {
      gig_id: 1,
      gig_name: 'Updated Festival Name',
      verified: 1
    };

    const result = await adminService.updateFestival(req);
    
    expect(adminModel.updateFestival).toHaveBeenCalledWith(1, 'Updated Festival Name', 1);
    expect(result).toEqual(mockUpdateResult);
  });

  test('updateFestival should convert verified to 1 or 0 properly', async () => {
    const mockUpdateResult = { affectedRows: 1 };
    adminModel.updateFestival.mockResolvedValue(mockUpdateResult);
    
    // Test with verified = 0
    const req1 = {
      gig_id: 1,
      gig_name: 'Festival Name',
      verified: 0
    };
    await adminService.updateFestival(req1);
    expect(adminModel.updateFestival).toHaveBeenCalledWith(1, 'Festival Name', 0);

    // Test with verified = false (should convert to 0)
    const req2 = {
      gig_id: 2,
      gig_name: 'Festival Name 2',
      verified: false
    };
    await adminService.updateFestival(req2);
    expect(adminModel.updateFestival).toHaveBeenCalledWith(2, 'Festival Name 2', 0);

    // Test with verified = true (should convert to 1)
    const req3 = {
      gig_id: 3,
      gig_name: 'Festival Name 3',
      verified: true
    };
    await adminService.updateFestival(req3);
    expect(adminModel.updateFestival).toHaveBeenCalledWith(3, 'Festival Name 3', 1);
  });

  test('approveFestival should call adminModel.approveFestival with correct ID and return the result', async () => {
    const mockApproveResult = { affectedRows: 1 };
    adminModel.approveFestival.mockResolvedValue(mockApproveResult);
    const req = { gig_id: 1 };

    const result = await adminService.approveFestival(req);
    
    expect(adminModel.approveFestival).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockApproveResult);
  });

  test('deleteFestival should call adminModel.deleteFestival with correct ID and return the result', async () => {
    const mockDeleteResult = { affectedRows: 1 };
    adminModel.deleteFestival.mockResolvedValue(mockDeleteResult);
    const req = { gig_id: 1 };

    const result = await adminService.deleteFestival(req);
    
    expect(adminModel.deleteFestival).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockDeleteResult);
  });
});
