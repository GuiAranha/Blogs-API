const joi = require('joi');
const jwt = require('./jwt');
const { User } = require('../database/models');
const NewError = require('../utils/baseError');

const userSchema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string().required(),
});

const createUser = async (displayName, email, password, image) => {
  const { error } = userSchema.validate({ displayName, email, password, image });
  
  if (error) {
    throw new NewError(400, error.message);
  }

  const user = await User.findOne({ where: { email } });
  if (user) {
    throw new NewError(409, 'User already registered');
  }
  await User.create({ displayName, email, password, image });
  const token = jwt.createToken(email, password);
  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    throw new NewError(404, 'User does not exist');
  }
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};