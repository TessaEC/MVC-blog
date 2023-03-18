const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
  content: {
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
  modelName: 'comment'
});

module.exports = Comment;