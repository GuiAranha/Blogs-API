const loginRoute = require('express').Router();
const loginController = require('../controllers/login.controller');

loginRoute.post('/', loginController.login);

module.exports = loginRoute;