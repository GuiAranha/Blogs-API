const { Category } = require('../database/models');
const NewError = require('../utils/baseError');

const createCategory = async (name) => {
  if (!name) {
    throw new NewError(400, '"name" is required');
  }

  const category = await Category.create({ name });
  return category;
};

const getAllCategories = async () => {
  const data = await Category.findAll();
  return data;
};

module.exports = {
  createCategory,
  getAllCategories,
};