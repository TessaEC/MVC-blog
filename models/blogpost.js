const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class BlogPost extends Model {}

BlogPost.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
});

BlogPost.belongsTo(User, { foreignKey: 'user_id' });

module.exports = BlogPost;


// function BlogPost(authorName, title, text, createdOn) {
//     this.authorName = authorName;
//     this.title = title;
//     this.text = text;
//     this.createdOn = createdOn;
//     this.comments = [];
//     this.printMetaData = function () {
//       console.log(`Created by ${this.authorName} on ${this.createdOn}`);
//     };
//   }
  
//   // TODO: Add a comment describing the purpose of `.prototype` in this method declaration
//   BlogPost.prototype.addComent = function(comment) {
//     this.comments.push(comment);
//   };
  
//   const post = new BlogPost(
//     'John Doe',
//     'My Second Post',
//     'Cats are super cute!',
//     '12/16/2021'
//   );
  
//   post.addComent('Nice post, I like it!');
  
//   // TODO: Add a comment describing what you expect to see printed in the console
//   console.log(post.comments);