const authService = require('../services/authService');
const { buildResponse } = require('../helpers/responseHelper');

const register = async (req, res) => {
  try {
    const { first_name, provider, email, password, role } = req.body;

    if (!first_name || !provider || !email || !password) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    if (provider !== "self" && provider !== "google") {
      return res.status(400).json(buildResponse(false, 400, "Invalid provider"));
    }

    if (await authService.checkEmail(email)) {
      return res.status(400).json(buildResponse(false, 400, "Email already exists"));
    }

    const result = await authService.register(req.body);

    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    if (!await authService.checkEmail(req.body)) {
      return res.status(400).json(buildResponse(false, 400, "Email does not exist"));
    }

    const result = await authService.login(req.body);

    if (result.success) {
      res.status(200).json(buildResponse(true, 200, "Success", result.message));
    } else {
      res.status(400).json(buildResponse(false, 400, result.message));
    }
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const verify = async (req, res) => {
  try {
    const user = req.user;
    
    result = user;
    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json(buildResponse(false, 401, "Unauthorized - No user found"));
    }

    if (user.role !== 'Admin') {
      return res.status(403).json(buildResponse(false, 403, "Forbidden - Admin access required"));
    }

    res.status(200).json(buildResponse(true, 200, "Success", user));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
};


const getCredentials = async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }

    const result = await authService.getCredentials(req.body);
    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(buildResponse(false, 400, "Missing required fields"));
    }
    const result = await authService.checkEmail(req.body);
    res.status(200).json(buildResponse(true, 200, "Success", result));
  } catch (error) {
    res.status(500).json(buildResponse(false, 500, error.message));
  }
}

module.exports = {
  register,
  login,
  getCredentials,
  verify,
  verifyAdmin,
  checkEmail
};