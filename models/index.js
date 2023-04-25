const BlogPost = require('./BlogPost');
const Comment = require('./comment');
const User = require('./user');

User.hasMany(Comment, { foreignKey: 'user_id' });
User.hasMany(BlogPost, { foreignKey: 'user_id' });

BlogPost.hasMany(Comment, { foreignKey: 'blog_post_id' });
BlogPost.belongsTo(User, { foreignKey: 'user_id' });

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(BlogPost, { foreignKey: 'blog_post_id' });

module.exports = { User, BlogPost, Comment };