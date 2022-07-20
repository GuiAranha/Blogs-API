const blogPostRoute = require('express').Router();
const validateToken = require('../middlewares/validateToken.middleware');
const blogPostController = require('../controllers/blogPost.controller');

blogPostRoute.post('/', validateToken, blogPostController.createBlogPost);

module.exports = blogPostRoute;