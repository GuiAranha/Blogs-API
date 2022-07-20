const blogPostServices = require('../services/blogPost.services');

const createBlogPost = async (req, res, next) => {
  const { id } = req.user.dataValues;
  const { title, content, categoryIds } = req.body;
  try {
    const data = await blogPostServices.createBlogPost(title, content, categoryIds, id);
    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBlogPost,
};