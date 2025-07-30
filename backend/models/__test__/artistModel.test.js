const db = require('../../config/db.js');
const {
  getAllArtists,
  getAllArtistIds,
  getArtistById,
  getArtistIdByUserId,
  createArtist,
  updateArtist,
  deleteArtist,
  registerArtist,
} = require('../artistModel');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('Artist Model', () => {
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

  test('getAllArtistIds should return all verified artist ids and names', async () => {
    const mockArtistIds = [{ artist_id: 1, name: 'Artist 1' }];
    db.query.mockResolvedValue([mockArtistIds]);

    const result = await getAllArtistIds();
    expect(result).toEqual(mockArtistIds);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getArtistById should return artist by id', async () => {
    const mockArtist = [{ artist_id: 1, name: 'Artist 1' }];
    db.query.mockResolvedValue([mockArtist]);

    const result = await getArtistById(1);
    expect(result).toEqual(mockArtist);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('getArtistIdByUserId should return artist id by user id', async () => {
    const mockArtistId = [{ artist_id: 1 }];
    db.query.mockResolvedValue([mockArtistId]);

    const result = await getArtistIdByUserId(1);
    expect(result).toEqual(mockArtistId);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('createArtist should insert a new artist', async () => {
    const mockResult = { insertId: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await createArtist(true, 'Artist 1', 'Bio', 'Links', 'Credits', 'Genre', 'SortCode', 'AccountNumber', 'AccountName', true);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [true, 'Artist 1', 'Bio', 'Links', 'Credits', 'Genre', 'SortCode', 'AccountNumber', 'AccountName', true]);
  });

  test('updateArtist should update an existing artist', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await updateArtist('Artist 1', 'Town', 'MusicLink', 'MobileNumber', 'Genre', 'Links', 'Bio', 'ImagePath', 'BankFullName', 'BankAccountType', 'BankAccountNumber', 'SortCode', 1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['Artist 1', 'Town', 'MusicLink', 'MobileNumber', 'Genre', 'Links', 'Bio', 'ImagePath', 'BankFullName', 'BankAccountType', 'BankAccountNumber', 'SortCode', 1]);
  });

  test('deleteArtist should delete an artist by id', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await deleteArtist(1);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('registerArtist should insert a new artist with user id', async () => {
    const mockResult = { insertId: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await registerArtist(1, 'Artist 1', 'Town', 'MusicLink', 'MobileNumber', 'Genre', 'Links', 'FirstHeadlineGig', 'NeedHelpBooking', 'Bio', 'BankFullName', 'BankAccountType', 'BankAccountNumber', 'SortCode', 'ImagePath', true);
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1, 'Artist 1', 'Town', 'MusicLink', 'MobileNumber', 'Genre', 'Links', 'FirstHeadlineGig', 'NeedHelpBooking', 'Bio', 'BankFullName', 'BankAccountType', 'BankAccountNumber', 'SortCode', 'ImagePath', true]);
  });
});
