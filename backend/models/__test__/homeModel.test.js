const homeModel = require('../homeModel');
const db = require('../../config/db');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('homeModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getUpcomingGigs should return upcoming gigs', async () => {
    const mockGigs = [
      { gig_id: 1, gig_name: 'Gig 1', venue_city: 'City 1', image_path: 'path1.jpg' },
      { gig_id: 2, gig_name: 'Gig 2', venue_city: 'City 2', image_path: 'path2.jpg' },
    ];
    db.query.mockResolvedValue([mockGigs]);

    const result = await homeModel.getUpcomingGigs();
    expect(result).toEqual(mockGigs);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getRecentGigs should return recent gigs', async () => {
    const mockGigs = [
      { gig_id: 1, gig_name: 'Gig 1', venue_name: 'Venue 1', date: '2023-10-01', supports: 'Support 1' },
      { gig_id: 2, gig_name: 'Gig 2', venue_name: 'Venue 2', date: '2023-10-02', supports: 'Support 2' },
    ];
    db.query.mockResolvedValue([mockGigs]);

    const result = await homeModel.getRecentGigs();
    expect(result).toEqual(mockGigs);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getArtistOfTheWeek should return artist of the week', async () => {
    const mockArtist = [
      { artist_id: 1, name: 'Artist 1', bio: 'Bio 1', image_path: 'path1.jpg' }
    ];
    db.query.mockResolvedValue([mockArtist]);

    const result = await homeModel.getArtistOfTheWeek();
    expect(result).toEqual(mockArtist);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });
});
