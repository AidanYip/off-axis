const db = require('../../config/db.js');
const {
  getAllArtists,
  getAllArtistApplications,
  getArtistById,
  updateArtist,
  deleteArtist,
  approveArtist,
  getAllUpcomingGigsArtistInfo,
  getAllGigDraftsArtistInfo,
  getAllPastGigsArtistInfo,
  getGigByGigId,
  updateGig,
  approveGig,
  deleteGig,
  getAllUpcomingFestivals,
  getAllPastFestivals,
  updateFestival,
  approveFestival,
  deleteFestival,
  createFestival,
  getFestivalByGigId,
} = require('../adminModel');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('Admin Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllArtists should return all verified artists', async () => {
    const mockArtists = [{ artist_id: 1, name: 'Artist 1' }];
    db.query.mockResolvedValue([mockArtists]);

    const result = await getAllArtists();
    expect(result).toEqual(mockArtists);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getAllArtistApplications should return all unverified artist applications', async () => {
    const mockApplications = [{ artist_id: 1, name: 'Artist 1' }];
    db.query.mockResolvedValue([mockApplications]);

    const result = await getAllArtistApplications();
    expect(result).toEqual(mockApplications);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getArtistById should return artist by id', async () => {
    const mockArtist = [{ artist_id: 1, name: 'Artist 1' }];
    db.query.mockResolvedValue([mockArtist]);

    const result = await getArtistById(1);
    expect(result).toEqual(mockArtist);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('updateArtist should update an existing artist', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await updateArtist('Artist 1', 'Town', 'MusicLink', 'MobileNumber', 'Genre', 'Links', 'Bio', 'ImagePath', 'BankFullName', 'BankAccountType', 'BankAccountNumber', 'SortCode', true, 1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['Artist 1', 'Town', 'MusicLink', 'MobileNumber', 'Genre', 'Links', 'Bio', 'ImagePath', 'BankFullName', 'BankAccountType', 'BankAccountNumber', 'SortCode', true, 1]);
  });

  test('deleteArtist should delete an artist by id', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await deleteArtist(1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('approveArtist should verify an artist by id', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await approveArtist(1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('getAllUpcomingGigsArtistInfo should return all upcoming gigs with artist info', async () => {
    const mockGigs = [{ gig_id: 1, gig_name: 'Gig 1' }];
    db.query.mockResolvedValue([mockGigs]);

    const result = await getAllUpcomingGigsArtistInfo();
    expect(result).toEqual(mockGigs);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getAllGigDraftsArtistInfo should return all gig drafts with artist info', async () => {
    const mockDrafts = [{ gig_id: 1, gig_name: 'Gig 1' }];
    db.query.mockResolvedValue([mockDrafts]);

    const result = await getAllGigDraftsArtistInfo();
    expect(result).toEqual(mockDrafts);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getAllPastGigsArtistInfo should return all past gigs with artist info', async () => {
    const mockGigs = [{ gig_id: 1, gig_name: 'Gig 1' }];
    db.query.mockResolvedValue([mockGigs]);

    const result = await getAllPastGigsArtistInfo();
    expect(result).toEqual(mockGigs);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getGigByGigId should return gig by id', async () => {
    const mockGig = [{ gig_id: 1, gig_name: 'Gig 1' }];
    db.query.mockResolvedValue([mockGig]);

    const result = await getGigByGigId(1);
    expect(result).toEqual(mockGig);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('updateGig should update an existing gig', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await updateGig(1, '2023-12-31', '18:00', 'Description', 20.0, 100, 'Gig 1', 'ImagePath', true, 1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, '2023-12-31', '18:00', 'Description', 20.0, 100, 'Gig 1', 'ImagePath', true, 1]);
  });

  test('approveGig should verify a gig by id', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await approveGig(1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('deleteGig should delete a gig by id', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await deleteGig(1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('getAllUpcomingFestivals should return all upcoming festivals', async () => {
    const mockFestivals = [{ gig_id: 1, gig_name: 'Festival 1' }];
    db.query.mockResolvedValue([mockFestivals]);

    const result = await getAllUpcomingFestivals();
    expect(result).toEqual(mockFestivals);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getAllPastFestivals should return all past festivals', async () => {
    const mockFestivals = [{ gig_id: 1, gig_name: 'Festival 1' }];
    db.query.mockResolvedValue([mockFestivals]);

    const result = await getAllPastFestivals();
    expect(result).toEqual(mockFestivals);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('updateFestival should update an existing festival', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await updateFestival(1, 'Festival 1', true);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['Festival 1', true, 1]);
  });

  test('approveFestival should verify a festival by id', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await approveFestival(1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('deleteFestival should delete a festival by id', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await deleteFestival(1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('createFestival should insert a new festival', async () => {
    const mockResult = { insertId: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await createFestival(1, true, '2023-12-31', '18:00', 'Description', 30.0, 25.0, 100, 'Festival 1');
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, true, '2023-12-31', '18:00', 'Description', 30.0, 25.0, 100, 'Festival 1']);
  });

  test('getFestivalByGigId should return festival by gig id', async () => {
    const mockFestival = [{ gig_id: 1, gig_name: 'Festival 1' }];
    db.query.mockResolvedValue([mockFestival]);

    const result = await getFestivalByGigId(1);
    expect(result).toEqual(mockFestival);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });
});
