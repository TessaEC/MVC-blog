const sequelize = require('../config/connection');

const seedUsers = require('./User-seeds');
const seedPosts = require('./BlogPost-seeds');
const seedComments = require('./Comment-seeds');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USER SEEDED -----\n');

  await seedPosts();
  console.log('\n----- POST SEEDED -----\n');

  await seedComments();
  console.log('\n----- COMMENT SEEDED -----\n');

  process.exit(0);
};

seedAll();