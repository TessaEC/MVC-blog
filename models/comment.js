const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  comment_content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  blog_post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'BlogPost',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Comment'
});

module.exports = Comment;
