const jwt = require('jsonwebtoken');
const NewError = require('../utils/baseError');

const createToken = (user) => {
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (err) {
    throw new NewError(401, 'Expired or invalid token');
  }
};

module.exports = { 
  createToken,
  validateToken,
 };