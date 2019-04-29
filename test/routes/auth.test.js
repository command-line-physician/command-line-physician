require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../lib/app');
const User = require('../../lib/models/userSchema');

describe('auth routes', () => {
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
  it('can sign up a new user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode@email.com',
        password: 'youllneverguess',
        profilePhoto: 'coolPhoto.jpg'
      })
      .then(res => {
        expect(res.body).toEqual({
          user: {
            email: 'intromode@email.com',
            profilePhoto: 'coolPhoto.jpg',
            _id: expect.any(String)
          }, token: expect.any(String)
        });
      });
  });
});
