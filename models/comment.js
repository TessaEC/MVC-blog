const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      },
content: {
  type: DataTypes.TEXT,
  allowNull: false
},
user_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'user',
    key: 'id'
  }
},
blog_post_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'blog_post',
    key: 'id'
  }
},
created_at: {
  type: DataTypes.DATE,
  allowNull: false,
  defaultValue: DataTypes.NOW
}
}, {
sequelize,
modelName: 'comment'
});

module.exports = Comment;