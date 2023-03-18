// const sequelize = require('../config/connection');

// const seedUsers = require('./User-seeds');
// const seedPosts = require('./BlogPost-seeds');
// const seedComments = require('./Comment-seeds');

// const seedAll = async () => {
//   await sequelize.sync({ force: true });
//   console.log('\n----- DATABASE SYNCED -----\n');
//   await seedUsers();
//   console.log('\n----- USER SEEDED -----\n');

//   await seedPosts();
//   console.log('\n----- POST SEEDED -----\n');

//   await seedComments();
//   console.log('\n----- COMMENT SEEDED -----\n');

//   process.exit(0);
// };

// seedAll();

const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');
const bcrypt = require('bcrypt');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Promise.all(userData.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return {
      ...user,
      password: hashedPassword,
    }
    }));

    await User.bulkCreate(users, {
      individualHooks: true,
      returning: true,
    });

    for (const blogPost of blogPostData) {
      await BlogPost.create({
        ...blogPost,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    process.exit(0);
  };

  seedDatabase();
  
//   User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const blogPost of blogPostData) {
//     await BlogPost.create({
//       ...blogPost,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   for (const comment of commentData) {
//     await Comment.create({
//       ...comment,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }

//   process.exit(0);
// };

// seedDatabase();