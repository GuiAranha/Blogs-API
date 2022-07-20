module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "BlogPost",
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "Category",
        key: "id",
      },
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },{
    timestamps: false,
  });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreingKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreingKey: 'categoryId',
      otherKey: 'postId',
    });
  }
  return PostCategory;
}