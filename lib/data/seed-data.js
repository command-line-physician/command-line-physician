const herbData = require('./herb-data');
const Herb = require('../models/herbSchema');


module.exports = async() => {
  const createdHerbs = await Herb.create(herbData);
  return [createdHerbs];
};
