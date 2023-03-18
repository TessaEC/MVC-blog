const { User } = require('../models');

const userData = [
    {
        user_id: 1,
      username: 'johndoe',
      password: 'password1'
    },
    {
        user_id: 2,
      username: 'janedoe',
      password: 'password2'
    }
  ]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;