const joi = require('joi');
const jwt = require('./jwt');
const { User } = require('../database/models');
const NewError = require('../utils/baseError');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const login = async (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  
  if (error) {
    throw new NewError(400, 'Some required fields are missing');
  }

  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    throw new NewError(400, 'Invalid fields');
  }

  const token = jwt.createToken(email, password);
  return token;
};

module.exports = {
  login,
};