const request = require('supertest');
const app = require('../../lib/app');
const seedData = require('../../lib/data/seed-data');
const mongoose = require('mongoose');

describe('seed data populating database', () => {
  beforeAll(() => {
    return mongoose.connect('mongodb://localhost:27017/herbs', {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    });
  });
  
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  beforeEach(() => {
    seedData();
  });

  it('has all the herbs in the database', () => {
    return request(app)
      .get('/api/v1/herbs')
      .then(res => {
        expect(res.body).toHaveLength(22);
      });
  });
});
