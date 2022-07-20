const userRoute = require('express').Router();
const validateToken = require('../middlewares/validateToken.middleware');
const userController = require('../controllers/user.controller');

userRoute.post('/', userController.createUser);

userRoute.get('/', validateToken, userController.getAllUsers);
userRoute.get('/:id', validateToken, userController.getUserById);

module.exports = userRoute;