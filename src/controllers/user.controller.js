const userServices = require('../services/user.service');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  try {
    const data = await userServices.createUser(displayName, email, password, image);
    return res.status(201).json({ token: data });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (_req, res) => {
  const data = await userServices.getAllUsers();
  res.status(200).json(data);
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await userServices.getUserById(id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};