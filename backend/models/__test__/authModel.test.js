const db = require('../../config/db.js');
const {
  register,
  checkEmail,
  updateToken,
  login,
  getUserById,
} = require('../authModel');

jest.mock('../../config/db.js', () => ({
  query: jest.fn()
}));

describe('Auth Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('register should insert a new user', async () => {
    const mockResult = { insertId: 1, affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await register('First', 'Last', 'Provider', 'email@example.com', 'password', 'role');
    expect(result).toEqual({ user_id: 1, first_name: 'First', last_name: 'Last', role: 'role', provider: 'Provider', email: 'email@example.com' });
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['First', 'Last', 'Provider', 'email@example.com', 'password', 'role']);
  });

  test('checkEmail should return true if email exists', async () => {
    const mockRows = [{ user_id: 1 }];
    db.query.mockResolvedValue([mockRows]);

    const result = await checkEmail('email@example.com');
    expect(result).toBe(true);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['email@example.com']);
  });

  test('checkEmail should return false if email does not exist', async () => {
    db.query.mockResolvedValue([[]]);

    const result = await checkEmail('email@example.com');
    expect(result).toBe(false);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['email@example.com']);
  });

  test('updateToken should update the JWT token for a user', async () => {
    const mockResult = { affectedRows: 1 };
    db.query.mockResolvedValue([mockResult]);

    const result = await updateToken(1, 'new_jwt_token');
    expect(result).toBe(true);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['new_jwt_token', 1]);
  });

  test('login should return password and JWT token for a user', async () => {
    const mockResult = [{ password: 'password', jwt_token: 'jwt_token' }];
    db.query.mockResolvedValue([mockResult]);

    const result = await login('email@example.com');
    expect(result).toEqual({ password: 'password', jwt_token: 'jwt_token' });
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['email@example.com']);
  });

  test('login should throw an error if email does not exist', async () => {
    db.query.mockResolvedValue([[]]);

    await expect(login('email@example.com')).rejects.toThrow('Email does not exist');
    expect(db.query).toHaveBeenCalledWith(expect.any(String), ['email@example.com']);
  });

  test('getUserById should return user details by user id', async () => {
    const mockResult = [{ user_id: 1, first_name: 'First', last_name: 'Last', role: 'role', provider: 'Provider', email: 'email@example.com' }];
    db.query.mockResolvedValue([mockResult]);

    const result = await getUserById(1);
    expect(result).toEqual(mockResult[0]);
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });

  test('getUserById should return null if user does not exist', async () => {
    db.query.mockResolvedValue([[]]);

    const result = await getUserById(1);
    expect(result).toBeNull();
    expect(db.query).toHaveBeenCalledWith(expect.any(String), [1]);
  });
});
