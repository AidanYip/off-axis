const authModel = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req) => {
  const { first_name, last_name, provider, email, password, role } = req;

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  const user = await authModel.register(first_name, last_name, provider, email, hashed_password, role);

  const payload = {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    role: user.role || "Customer",
    provider: user.provider,
    email: user.email
  };

  const jwt_token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

  if (await authModel.updateToken(user.user_id, jwt_token)) {
    result = jwt_token;
  }

  return result;
}

const login = async (req) => {
  const { email, password } = req;
  const user = await authModel.login(email);
  // return differently here since throwing error on service would be caught on frontend
  if (await bcrypt.compare(password, user.password)) {
    return { success: true, message: user.jwt_token };
  } else {
    return { success: false, message: "Invalid email or password" };
  }
}

const checkEmail = async (req) => {
  const { email } = req;
  const result = await authModel.checkEmail(email);
  return result;
}

const getCredentials = async (req) => {
  const { access_token } = req;
  const result = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);
  return result.json();
}

module.exports = {
  register,
  checkEmail,
  login,
  getCredentials,
};
