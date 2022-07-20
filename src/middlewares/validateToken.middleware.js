const jwt = require('../services/jwt');
const NewError = require('../utils/baseError');
const { User } = require('../database/models');

const validateToken = async (req, _res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    if (!authorization) {
      throw new NewError(401, 'Token not found');
    }
    const userEmail = jwt.validateToken(authorization);
    const user = await User.findOne({ where: { email: userEmail } });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateToken;