jest.mock('../../models/userModel', () => ({
  getAllUsers: jest.fn(),
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn()
}));

const userService = require('../userService');
const userModel = require('../../models/userModel');

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers should return result from userModel.getAllUsers', async () => {
    const mockResult = [{ id: 1, email: 'test@example.com' }];
    userModel.getAllUsers.mockResolvedValue(mockResult);

    const result = await userService.getAllUsers();
    expect(result).toEqual(mockResult);
    expect(userModel.getAllUsers).toHaveBeenCalledTimes(1);
  });

  test('getUserByEmail should return result from userModel.getUserByEmail', async () => {
    const mockResult = { id: 1, email: 'test@example.com' };
    const req = { email: 'test@example.com' };
    userModel.getUserByEmail.mockResolvedValue(mockResult);

    const result = await userService.getUserByEmail(req);
    expect(result).toEqual(mockResult);
    expect(userModel.getUserByEmail).toHaveBeenCalledWith(req.email);
    expect(userModel.getUserByEmail).toHaveBeenCalledTimes(1);
  });

  test('createUser should return result from userModel.createUser', async () => {
    const mockResult = { success: true };
    const req = { email: 'test@example.com', password: 'password', ticket_list: [] };
    userModel.createUser.mockResolvedValue(mockResult);

    const result = await userService.createUser(req);
    expect(result).toEqual(mockResult);
    expect(userModel.createUser).toHaveBeenCalledWith(req.email, req.password, req.ticket_list);
    expect(userModel.createUser).toHaveBeenCalledTimes(1);
  });

  test('updateUser should return result from userModel.updateUser', async () => {
    const mockResult = { success: true };
    const req = { email: 'test@example.com', password: 'newpassword', ticket_list: [] };
    userModel.updateUser.mockResolvedValue(mockResult);

    const result = await userService.updateUser(req);
    expect(result).toEqual(mockResult);
    expect(userModel.updateUser).toHaveBeenCalledWith(req.email, req.password, req.ticket_list);
    expect(userModel.updateUser).toHaveBeenCalledTimes(1);
  });

  test('deleteUser should return result from userModel.deleteUser', async () => {
    const mockResult = { success: true };
    const req = { email: 'test@example.com' };
    userModel.deleteUser.mockResolvedValue(mockResult);

    const result = await userService.deleteUser(req);
    expect(result).toEqual(mockResult);
    expect(userModel.deleteUser).toHaveBeenCalledWith(req.email);
    expect(userModel.deleteUser).toHaveBeenCalledTimes(1);
  });
});
