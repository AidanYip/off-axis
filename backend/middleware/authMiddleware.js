const jwt = require('jsonwebtoken');
const { buildResponse } = require('../helpers/responseHelper');
const authModel = require('../models/authModel');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(403).json(buildResponse(false, 403, "No token provided"));

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json(buildResponse(false, 403, "Invalid token format"));
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await authModel.getUserById(decoded.user_id);
    if (
      !user ||
      user.first_name !== decoded.first_name ||
      user.role !== decoded.role ||
      user.provider !== decoded.provider ||
      user.email !== decoded.email
    ) {
      return res.status(401).json(buildResponse(false, 401, "Token is outdated or invalid"));
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(500).json(buildResponse(false, 500, "Failed to authenticate token"));
  }
};

module.exports = verifyToken;
