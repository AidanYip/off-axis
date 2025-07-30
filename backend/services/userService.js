const userModel = require('../models/userModel');

const getAllUsers = async () => {
  const result = userModel.getAllUsers();
  return result;
};

const getUserByEmail = async (req) => {
  const { email } = req;

  const result = userModel.getUserByEmail(email);
  return result;
}

const createUser = async (req) => {
  const { email, password, ticket_list } = req;

  const result = await userModel.createUser(email, password, ticket_list);
  return result;
};

const updateUser = async (req) => {
  const { email, password, ticket_list } = req;

  const result = await userModel.updateUser(email, password, ticket_list);
  return result;
};

const deleteUser = async (req) => {
  const { email } = req;

  const result = await userModel.deleteUser(email);
  return result;
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}