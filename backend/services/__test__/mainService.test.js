jest.mock('../../models/mainModel', () => ({
  uploadImage: jest.fn(),
  createTable: jest.fn(),
  mockPopulateTable: jest.fn()
}));

const mainService = require('../mainService');
const mainModel = require('../../models/mainModel');

describe('mainService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('uploadImage should return result from mainModel.uploadImage', async () => {
    const mockResult = { success: true };
    const req = { model: 'artist', model_id: 1 };
    const imagePath = 'path/to/image.jpg';
    mainModel.uploadImage.mockResolvedValue(mockResult);

    const result = await mainService.uploadImage(req, imagePath);
    expect(result).toEqual(mockResult);
    expect(mainModel.uploadImage).toHaveBeenCalledWith('Artist', 1, imagePath);
    expect(mainModel.uploadImage).toHaveBeenCalledTimes(1);
  });

  test('createTable should return result from mainModel.createTable', async () => {
    const mockResult = { success: true };
    mainModel.createTable.mockResolvedValue(mockResult);

    const result = await mainService.createTable();
    expect(result).toEqual(mockResult);
    expect(mainModel.createTable).toHaveBeenCalledTimes(1);
  });

  test('mockPopulateTable should return result from mainModel.mockPopulateTable', async () => {
    const mockResult = { success: true };
    mainModel.mockPopulateTable.mockResolvedValue(mockResult);

    const result = await mainService.mockPopulateTable();
    expect(result).toEqual(mockResult);
    expect(mainModel.mockPopulateTable).toHaveBeenCalledTimes(1);
  });
});
