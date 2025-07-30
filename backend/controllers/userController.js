const userService = require('../services/userService');
const { buildResponse } = require('../helpers/responseHelper');

const getAllUsers = async (req, res) => {
  try {
    const result = await userService.getAllUsers();

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await userService.getUserByEmail(req.body);

    if (!result || result.length === 0) {
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const createUser = async (req, res) => {
  try {
    const { email, password, ticket_list } = req.body;

    if (!email || !password) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await userService.createUser(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, password, ticket_list } = req.body;

    if (!email || !password) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await userService.updateUser(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await userService.deleteUser(req.body);

    if (!result || result.affectedRows === 0){
      return res.status(404).json(buildResponse(false, 404, "Data not found"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};