const joi = require('joi');
// const jwt = require('./jwt');
const { BlogPost, Category, PostCategory } = require('../database/models');
const NewError = require('../utils/baseError');

const blogPostSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().items(joi.number()).required(),
});

const validations = async (title, content, categoryIds) => {
  // console.log(title, content, categoryIds);
  const { error } = blogPostSchema.validate({ title, content, categoryIds });
  
  if (error) {
    throw new NewError(400, 'Some required fields are missing');
  }

  const categories = await Category.findAll();
  const listCategories = categories.map((item) => item.id);
  const hasCategory = categoryIds.every((item) => listCategories.includes(item));
  
  if (!hasCategory) {
    throw new NewError(400, '"categoryIds" not found');
  }
};

const createBlogPost = async (title, content, categoryIds, userId) => {
  await validations(title, content, categoryIds);

  const data = await BlogPost.create({
    title,
    content,
    categoryIds,
    userId,
    published: new Date(),
    updated: new Date(),
  });

  console.log(data.dataValues);
  await Promise.all(categoryIds
    .map((item) => PostCategory.create({ postId: data.dataValues.id, categoryId: item })));
  console.log('********************************************************************');
  return data.dataValues;
};

module.exports = {
  createBlogPost,
};