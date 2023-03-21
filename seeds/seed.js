const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

// Create users
const users = [
  {
    username: 'john_doe',
    password: 'password123'
  },
  {
    username: 'jane_doe',
    password: 'password456'
  },
  {
    username: 'jim_smith',
    password: 'password789'
  }
];

sequelize.sync({ force: true })
  .then(() => User.bulkCreate(users))
  .then(() => {
    // Get users to create blog posts for
    return User.findAll();
  })
  .then((users) => {
    // Create blog posts for each user
    const posts = [];

    users.forEach((user) => {
      const post1 = {
        title: 'My First Blog Post',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user_id: user.id
      };

      const post2 = {
        title: 'My Second Blog Post',
        content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user_id: user.id
      };

      posts.push(post1, post2);
    });

    return BlogPost.bulkCreate(posts);
  })
  .then(() => {
    // Get users and blog posts to create comments for
    return Promise.all([
      User.findAll(),
      Post.findAll()
    ]);
  })
  .then(([users, posts]) => {
    // Create comments for each blog post and user
    const comments = [];

    posts.forEach((post) => {
      const user = users[Math.floor(Math.random() * users.length)];
      const content = `Comment on ${post.title}`;

      comments.push({
        content: content,
        user_id: user.id,
        post_id: post.id
      });
    });

    return Comment.bulkCreate(comments);
  })
  .then(() => {
    console.log('Data created successfully.');
  })
  .catch((error) => {
    console.log('Error creating data:', error);
  });