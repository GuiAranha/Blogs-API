const categoryServices = require('../services/categories.service');

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const data = await categoryServices.createCategory(name);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (req, res) => {
  const data = await categoryServices.getAllCategories();
  return res.status(200).json(data);
};

module.exports = {
  createCategory,
  getAllCategories,
};