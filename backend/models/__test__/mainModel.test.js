const mainModel = require('../mainModel');
const db = require('../../config/db');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('mainModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('uploadImage should update image path', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await mainModel.uploadImage('Artist', 1, 'path/to/image.jpg');
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['path/to/image.jpg', 1]);
  });

  test('createTable should create tables', async () => {
    const mockResult = { affectedRows: 0 };
    db.query.mockResolvedValue([mockResult]);

    const result = await mainModel.createTable();
    expect(result).toEqual(expect.arrayContaining([mockResult]));
    expect(db.query).toHaveBeenCalled();
  });

  test('mockPopulateTable should populate tables', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await mainModel.mockPopulateTable();
    expect(result).toEqual(expect.arrayContaining([mockResult]));
    expect(db.query).toHaveBeenCalled();
  });
});
