const userModel = require('../userModel');
const db = require('../../config/db');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('userModel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers should return all users', async () => {
    const mockUsers = [
      { user_id: 1, email: 'test1@example.com', password: 'password1', ticket_list: '[]' },
      { user_id: 2, email: 'test2@example.com', password: 'password2', ticket_list: '[]' },
    ];
    db.query.mockResolvedValue([mockUsers]);

    const result = await userModel.getAllUsers();
    expect(result).toEqual(mockUsers);
    expect(db.query).toHaveBeenCalledWith(expect.any(String));
  });

  test('getUserByEmail should return user by email', async () => {
    const mockUser = [
      { user_id: 1, email: 'test1@example.com', password: 'password1', ticket_list: '[]' }
    ];
    db.query.mockResolvedValue([mockUser]);

    const result = await userModel.getUserByEmail('test1@example.com');
    expect(result).toEqual(mockUser);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['test1@example.com']);
  });

  test('createUser should insert a new user', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await userModel.createUser('test@example.com', 'password', '[]');
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['test@example.com', 'password', '[]']);
  });

  test('updateUser should update an existing user', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await userModel.updateUser('test@example.com', 'newpassword', '[]');
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['newpassword', '[]', 'test@example.com']);
  });

  test('deleteUser should delete a user by email', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await userModel.deleteUser('test@example.com');
    expect(result).toEqual(mockResult);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['test@example.com']);
  });
});
