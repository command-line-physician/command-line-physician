const herbData = require('./herb-data');
const Herb = require('../models/herbSchema');
const User = require('../models/userSchema');
const chance = require('chance').Chance();


module.exports = async() => {
  const users = await User.create([
    {
      email: 'user1@emial.com',
      password: '1234'
    },
    {
      email: 'user2@emial.com',
      password: '1234'
    },
    {
      email: 'user3@emial.com',
      password: '1234'
    }
  ]);
  const createdHerbs = await Herb.create(herbData.map(herb => ({
    ...herb,
    user: chance.pickone(users)._id
  })));
  return [createdHerbs];
};

