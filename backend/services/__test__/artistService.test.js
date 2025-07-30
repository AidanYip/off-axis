jest.mock('../../models/artistModel', () => ({
    getAllArtists: jest.fn(),
    getAllArtistIds: jest.fn(),
    getArtistById: jest.fn(),
    getArtistIdByUserId: jest.fn(),
    createArtist: jest.fn(),
    updateArtist: jest.fn(),
    deleteArtist: jest.fn(),
    registerArtist: jest.fn()
  }));
  
  const artistService = require('../artistService');
  const artistModel = require('../../models/artistModel');
  
  describe('Artist Service', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('getAllArtists', () => {
      it('should return all artists', async () => {
        // Arrange
        const mockArtists = [{ id: 1, name: 'Artist 1' }, { id: 2, name: 'Artist 2' }];
        artistModel.getAllArtists.mockResolvedValue(mockArtists);
  
        // Act
        const result = await artistService.getAllArtists();
  
        // Assert
        expect(artistModel.getAllArtists).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockArtists);
      });
  
      it('should handle errors when getting all artists', async () => {
        // Arrange
        const error = new Error('Database error');
        artistModel.getAllArtists.mockRejectedValue(error);
  
        // Act & Assert
        await expect(artistService.getAllArtists()).rejects.toThrow('Database error');
        expect(artistModel.getAllArtists).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('getAllArtistIds', () => {
      it('should return all artist IDs', async () => {
        // Arrange
        const mockArtistIds = [1, 2, 3];
        artistModel.getAllArtistIds.mockResolvedValue(mockArtistIds);
  
        // Act
        const result = await artistService.getAllArtistIds();
  
        // Assert
        expect(artistModel.getAllArtistIds).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockArtistIds);
      });
  
      it('should handle errors when getting all artist IDs', async () => {
        // Arrange
        const error = new Error('Database error');
        artistModel.getAllArtistIds.mockRejectedValue(error);
  
        // Act & Assert
        await expect(artistService.getAllArtistIds()).rejects.toThrow('Database error');
        expect(artistModel.getAllArtistIds).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('getArtistById', () => {
      it('should return an artist by ID', async () => {
        // Arrange
        const mockArtist = { id: 1, name: 'Artist 1' };
        const req = { artist_id: 1 };
        artistModel.getArtistById.mockResolvedValue(mockArtist);
  
        // Act
        const result = await artistService.getArtistById(req);
  
        // Assert
        expect(artistModel.getArtistById).toHaveBeenCalledTimes(1);
        expect(artistModel.getArtistById).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockArtist);
      });
  
      it('should handle errors when getting artist by ID', async () => {
        // Arrange
        const error = new Error('Artist not found');
        const req = { artist_id: 999 };
        artistModel.getArtistById.mockRejectedValue(error);
  
        // Act & Assert
        await expect(artistService.getArtistById(req)).rejects.toThrow('Artist not found');
        expect(artistModel.getArtistById).toHaveBeenCalledTimes(1);
        expect(artistModel.getArtistById).toHaveBeenCalledWith(999);
      });
    });
  
    describe('getArtistIdByUserId', () => {
      it('should return an artist ID by user ID', async () => {
        // Arrange
        const mockArtistId = 5;
        const req = { user_id: 10 };
        artistModel.getArtistIdByUserId.mockResolvedValue(mockArtistId);
  
        // Act
        const result = await artistService.getArtistIdByUserId(req);
  
        // Assert
        expect(artistModel.getArtistIdByUserId).toHaveBeenCalledTimes(1);
        expect(artistModel.getArtistIdByUserId).toHaveBeenCalledWith(10);
        expect(result).toEqual(mockArtistId);
      });
  
      it('should handle errors when getting artist ID by user ID', async () => {
        // Arrange
        const error = new Error('User not associated with any artist');
        const req = { user_id: 999 };
        artistModel.getArtistIdByUserId.mockRejectedValue(error);
  
        // Act & Assert
        await expect(artistService.getArtistIdByUserId(req)).rejects.toThrow('User not associated with any artist');
        expect(artistModel.getArtistIdByUserId).toHaveBeenCalledTimes(1);
        expect(artistModel.getArtistIdByUserId).toHaveBeenCalledWith(999);
      });
    });
  
    describe('createArtist', () => {
      it('should create an artist successfully', async () => {
        // Arrange
        const req = {
          is_festival: 0,
          name: 'New Artist',
          bio: 'Artist bio',
          links: JSON.stringify({ website: 'https://artist.com' }),
          credits: 'Credits info',
          genre: 'Rock',
          sort_code: '123456',
          account_number: '12345678',
          account_name: 'Artist Name',
          verified: 1
        };
        const mockResult = { id: 5, ...req };
        artistModel.createArtist.mockResolvedValue(mockResult);
  
        // Act
        const result = await artistService.createArtist(req);
  
        // Assert
        expect(artistModel.createArtist).toHaveBeenCalledTimes(1);
        expect(artistModel.createArtist).toHaveBeenCalledWith(
          req.is_festival,
          req.name,
          req.bio,
          req.links,
          req.credits,
          req.genre,
          req.sort_code,
          req.account_number,
          req.account_name,
          req.verified
        );
        expect(result).toEqual(mockResult);
      });
  
      it('should handle errors when creating an artist', async () => {
        // Arrange
        const req = {
          is_festival: 0,
          name: 'New Artist',
          bio: 'Artist bio',
          links: JSON.stringify({ website: 'https://artist.com' }),
          credits: 'Credits info',
          genre: 'Rock',
          sort_code: '123456',
          account_number: '12345678',
          account_name: 'Artist Name',
          verified: 1
        };
        const error = new Error('Failed to create artist');
        artistModel.createArtist.mockRejectedValue(error);
  
        // Act & Assert
        await expect(artistService.createArtist(req)).rejects.toThrow('Failed to create artist');
        expect(artistModel.createArtist).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('updateArtist', () => {
      it('should update an artist successfully', async () => {
        // Arrange
        const req = {
          name: 'Updated Artist',
          town: 'London',
          music_link: 'https://music.com/artist',
          mobile_number: '1234567890',
          genre: 'Jazz',
          links: JSON.stringify({ website: 'https://artist.com' }),
          bio: 'Updated bio',
          image_path: '/images/artist.jpg',
          bank_full_name: 'Full Name',
          bank_account_type: 'Checking',
          bank_account_number: '12345678',
          sort_code: '123456',
          artist_id: 5
        };
        const mockResult = { id: 5, ...req };
        artistModel.updateArtist.mockResolvedValue(mockResult);
  
        // Act
        const result = await artistService.updateArtist(req);
  
        // Assert
        expect(artistModel.updateArtist).toHaveBeenCalledTimes(1);
        expect(artistModel.updateArtist).toHaveBeenCalledWith(
          req.name,
          req.town,
          req.music_link,
          req.mobile_number,
          req.genre,
          req.links,
          req.bio,
          req.image_path,
          req.bank_full_name,
          req.bank_account_type,
          req.bank_account_number,
          req.sort_code,
          req.artist_id
        );
        expect(result).toEqual(mockResult);
      });
  
      it('should handle errors when updating an artist', async () => {
        // Arrange
        const req = {
          name: 'Updated Artist',
          town: 'London',
          music_link: 'https://music.com/artist',
          mobile_number: '1234567890',
          genre: 'Jazz',
          links: JSON.stringify({ website: 'https://artist.com' }),
          bio: 'Updated bio',
          image_path: '/images/artist.jpg',
          bank_full_name: 'Full Name',
          bank_account_type: 'Checking',
          bank_account_number: '12345678',
          sort_code: '123456',
          artist_id: 999
        };
        const error = new Error('Artist not found');
        artistModel.updateArtist.mockRejectedValue(error);
  
        // Act & Assert
        await expect(artistService.updateArtist(req)).rejects.toThrow('Artist not found');
        expect(artistModel.updateArtist).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('deleteArtist', () => {
      it('should delete an artist successfully', async () => {
        // Arrange
        const req = { artist_id: 5 };
        const mockResult = { success: true, message: 'Artist deleted' };
        artistModel.deleteArtist.mockResolvedValue(mockResult);
  
        // Act
        const result = await artistService.deleteArtist(req);
  
        // Assert
        expect(artistModel.deleteArtist).toHaveBeenCalledTimes(1);
        expect(artistModel.deleteArtist).toHaveBeenCalledWith(5);
        expect(result).toEqual(mockResult);
      });
  
      it('should handle errors when deleting an artist', async () => {
        // Arrange
        const req = { artist_id: 999 };
        const error = new Error('Artist not found');
        artistModel.deleteArtist.mockRejectedValue(error);
  
        // Act & Assert
        await expect(artistService.deleteArtist(req)).rejects.toThrow('Artist not found');
        expect(artistModel.deleteArtist).toHaveBeenCalledTimes(1);
        expect(artistModel.deleteArtist).toHaveBeenCalledWith(999);
      });
    });
  
    describe('registerArtist', () => {
      it('should register an artist successfully', async () => {
        // Arrange
        const req = {
          user_id: 10,
          name: 'New Artist',
          town: 'London',
          music_link: 'https://music.com/artist',
          mobile_number: '1234567890',
          genre: 'Rock',
          links: JSON.stringify({ website: 'https://artist.com' }),
          first_headline_gig: '2023-01-01',
          need_help_booking: true,
          bio: 'Artist bio',
          bank_full_name: 'Full Name',
          bank_account_type: 'Checking',
          bank_account_number: '12345678',
          sort_code: '123456',
          image_path: '/images/artist.jpg'
        };
        const mockResult = { id: 5, ...req };
        artistModel.registerArtist.mockResolvedValue(mockResult);
  
        // Act
        const result = await artistService.registerArtist(req);
  
        // Assert
        expect(artistModel.registerArtist).toHaveBeenCalledTimes(1);
        expect(artistModel.registerArtist).toHaveBeenCalledWith(
          req.user_id,
          req.name,
          req.town,
          req.music_link,
          req.mobile_number,
          req.genre,
          req.links,
          req.first_headline_gig,
          1, // formatted_need_help_booking
          req.bio,
          req.bank_full_name,
          req.bank_account_type,
          req.bank_account_number,
          req.sort_code,
          req.image_path,
          0 // is_festival
        );
        expect(result).toEqual(mockResult);
      });
  
      it('should handle null first_headline_gig', async () => {
        // Arrange
        const req = {
          user_id: 10,
          name: 'New Artist',
          town: 'London',
          music_link: 'https://music.com/artist',
          mobile_number: '1234567890',
          genre: 'Rock',
          links: JSON.stringify({ website: 'https://artist.com' }),
          first_headline_gig: null,
          need_help_booking: false,
          bio: 'Artist bio',
          bank_full_name: 'Full Name',
          bank_account_type: 'Checking',
          bank_account_number: '12345678',
          sort_code: '123456',
          image_path: '/images/artist.jpg'
        };
        const mockResult = { id: 5, ...req };
        artistModel.registerArtist.mockResolvedValue(mockResult);
  
        // Act
        const result = await artistService.registerArtist(req);
  
        // Assert
        expect(artistModel.registerArtist).toHaveBeenCalledTimes(1);
        expect(artistModel.registerArtist).toHaveBeenCalledWith(
          req.user_id,
          req.name,
          req.town,
          req.music_link,
          req.mobile_number,
          req.genre,
          req.links,
          null, // formatted_first_headline_gig
          0, // formatted_need_help_booking
          req.bio,
          req.bank_full_name,
          req.bank_account_type,
          req.bank_account_number,
          req.sort_code,
          req.image_path,
          0 // is_festival
        );
        expect(result).toEqual(mockResult);
      });
  
      it('should handle errors when registering an artist', async () => {
        // Arrange
        const req = {
          user_id: 10,
          name: 'New Artist',
          town: 'London',
          music_link: 'https://music.com/artist',
          mobile_number: '1234567890',
          genre: 'Rock',
          links: JSON.stringify({ website: 'https://artist.com' }),
          first_headline_gig: '2023-01-01',
          need_help_booking: true,
          bio: 'Artist bio',
          bank_full_name: 'Full Name',
          bank_account_type: 'Checking',
          bank_account_number: '12345678',
          sort_code: '123456',
          image_path: '/images/artist.jpg'
        };
        const error = new Error('Registration failed');
        artistModel.registerArtist.mockRejectedValue(error);
  
        // Act & Assert
        await expect(artistService.registerArtist(req)).rejects.toThrow('Registration failed');
        expect(artistModel.registerArtist).toHaveBeenCalledTimes(1);
      });
    });
  });
