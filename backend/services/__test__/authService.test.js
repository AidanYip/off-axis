jest.mock('../../models/authModel', () => ({
    register: jest.fn(),
    updateToken: jest.fn(),
    login: jest.fn(),
    checkEmail: jest.fn()
  }));
  
  jest.mock('bcrypt', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn()
  }));
  
  jest.mock('jsonwebtoken', () => ({
    sign: jest.fn()
  }));
  
  // Mock node-fetch
  jest.mock('node-fetch', () => jest.fn());
  
  const authService = require('../authService');
  const authModel = require('../../models/authModel');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const fetch = global.fetch || require('node-fetch');
  
  describe('Authentication Service', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      process.env.JWT_SECRET_KEY = 'test-secret-key';
    });
  
    describe('register', () => {
      const mockUserData = {
        first_name: 'John',
        last_name: 'Doe',
        provider: 'email',
        email: 'john@example.com',
        password: 'password123',
        role: 'Customer'
      };
  
      const mockUser = {
        user_id: 1,
        first_name: 'John',
        last_name: 'Doe',
        provider: 'email',
        email: 'john@example.com',
        role: 'Customer'
      };
  
      it('should register a new user successfully', async () => {
        // Arrange
        const mockSalt = 'salt123';
        const mockHashedPassword = 'hashedpassword123';
        const mockToken = 'jwt-token-123';
        
        bcrypt.genSalt.mockResolvedValue(mockSalt);
        bcrypt.hash.mockResolvedValue(mockHashedPassword);
        authModel.register.mockResolvedValue(mockUser);
        jwt.sign.mockReturnValue(mockToken);
        authModel.updateToken.mockResolvedValue(true);
  
        // Act
        const result = await authService.register(mockUserData);
  
        // Assert
        expect(jwt.sign).toHaveBeenCalledWith({
          user_id: mockUser.user_id,
          first_name: mockUser.first_name,
          last_name: mockUser.last_name,
          role: mockUser.role,
          provider: mockUser.provider,
          email: mockUser.email
        }, process.env.JWT_SECRET_KEY);
        expect(authModel.updateToken).toHaveBeenCalledWith(mockUser.user_id, mockToken);
        expect(result).toBe(mockToken);
      });
  
      it('should handle updating token failure', async () => {
        // Arrange
        const mockSalt = 'salt123';
        const mockHashedPassword = 'hashedpassword123';
        const mockToken = 'jwt-token-123';
        
        bcrypt.genSalt.mockResolvedValue(mockSalt);
        bcrypt.hash.mockResolvedValue(mockHashedPassword);
        authModel.register.mockResolvedValue(mockUser);
        jwt.sign.mockReturnValue(mockToken);
        authModel.updateToken.mockResolvedValue(false);
  
        // Act
        const result = await authService.register(mockUserData);
  
        // Assert
        expect(authModel.updateToken).toHaveBeenCalledWith(mockUser.user_id, mockToken);
      });
  
      it('should use default role if not provided', async () => {
        // Arrange
        const userDataWithoutRole = { ...mockUserData };
        delete userDataWithoutRole.role;
        
        const mockSalt = 'salt123';
        const mockHashedPassword = 'hashedpassword123';
        const mockToken = 'jwt-token-123';
        
        bcrypt.genSalt.mockResolvedValue(mockSalt);
        bcrypt.hash.mockResolvedValue(mockHashedPassword);
        authModel.register.mockResolvedValue(mockUser);
        jwt.sign.mockReturnValue(mockToken);
        authModel.updateToken.mockResolvedValue(true);
  
        // Act
        await authService.register(userDataWithoutRole);
  
        // Assert
        expect(jwt.sign).toHaveBeenCalledWith(expect.objectContaining({
          role: 'Customer' // Default role should be used
        }), process.env.JWT_SECRET_KEY);
      });
    });
  
    describe('login', () => {
      const mockLoginData = {
        email: 'john@example.com',
        password: 'password123'
      };
  
      const mockUser = {
        user_id: 1,
        email: 'john@example.com',
        password: 'hashedpassword123',
        jwt_token: 'existing-token-123'
      };
  
      it('should login successfully with correct credentials', async () => {
        // Arrange
        authModel.login.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
  
        // Act
        const result = await authService.login(mockLoginData);
  
        // Assert
        expect(authModel.login).toHaveBeenCalledWith(mockLoginData.email);
      });
  
      it('should return failure with incorrect password', async () => {
        // Arrange
        authModel.login.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);
  
        // Act
        const result = await authService.login(mockLoginData);
  
        // Assert
        expect(authModel.login).toHaveBeenCalledWith(mockLoginData.email);
        expect(result).toEqual({
          success: false,
          message: 'Invalid email or password'
        });
      });
    });
  
    describe('checkEmail', () => {
      it('should check if email exists', async () => {
        // Arrange
        const email = 'john@example.com';
        const mockResult = { exists: true };
        authModel.checkEmail.mockResolvedValue(mockResult);
  
        // Act
        const result = await authService.checkEmail({ email });
  
        // Assert
        expect(authModel.checkEmail).toHaveBeenCalledWith(email);
        expect(result).toBe(mockResult);
      });
    });
  
    describe('getCredentials', () => {
      it('should fetch user credentials from Google API', async () => {
        // Arrange
        const access_token = 'google-access-token';
        const mockUserInfo = {
          id: '123456789',
          email: 'john@gmail.com',
          verified_email: true,
          name: 'John Doe',
          given_name: 'John',
          family_name: 'Doe',
          picture: 'https://example.com/photo.jpg'
        };
  
        // Mock the fetch response
        const mockResponse = {
          json: jest.fn().mockResolvedValue(mockUserInfo)
        };
  
        // Act
        const result = await authService.getCredentials({ access_token });
      });
    });
  });
