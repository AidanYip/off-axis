jest.mock('../../models/homeModel', () => ({
  getUpcomingGigs: jest.fn(),
  getRecentGigs: jest.fn(),
  getArtistOfTheWeek: jest.fn()
}));

const homeService = require('../homeService');
const homeModel = require('../../models/homeModel');

describe('homeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUpcomingGigs should return result from homeModel.getUpcomingGigs', async () => {
    const mockResult = [{ id: 1, name: 'Gig 1' }];
    homeModel.getUpcomingGigs.mockResolvedValue(mockResult);

    const result = await homeService.getUpcomingGigs();
    expect(result).toEqual(mockResult);
    expect(homeModel.getUpcomingGigs).toHaveBeenCalledTimes(1);
  });

  test('getRecentGigs should return result from homeModel.getRecentGigs', async () => {
    const mockResult = [{ id: 2, name: 'Gig 2' }];
    homeModel.getRecentGigs.mockResolvedValue(mockResult);

    const result = await homeService.getRecentGigs();
    expect(result).toEqual(mockResult);
    expect(homeModel.getRecentGigs).toHaveBeenCalledTimes(1);
  });

  test('getArtistOfTheWeek should return result from homeModel.getArtistOfTheWeek', async () => {
    const mockResult = { id: 3, name: 'Artist 1' };
    homeModel.getArtistOfTheWeek.mockResolvedValue(mockResult);

    const result = await homeService.getArtistOfTheWeek();
    expect(result).toEqual(mockResult);
    expect(homeModel.getArtistOfTheWeek).toHaveBeenCalledTimes(1);
  });
});
