const homeModel = require('../models/homeModel');

const getUpcomingGigs = async () => {
  const result = homeModel.getUpcomingGigs();
  return result;
};

const getRecentGigs = async () => {
  const result = homeModel.getRecentGigs();
  return result;
};

const getArtistOfTheWeek = async () => {
  const result = homeModel.getArtistOfTheWeek();
  return result;
};

module.exports = {
  getUpcomingGigs,
  getRecentGigs,
  getArtistOfTheWeek
};