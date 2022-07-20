const categoryRoute = require('express').Router();
const validateToken = require('../middlewares/validateToken.middleware');
const categoryController = require('../controllers/category.controller');

categoryRoute.post('/', validateToken, categoryController.createCategory);
categoryRoute.get('/', validateToken, categoryController.getAllCategories);

module.exports = categoryRoute;