const app = require('../../lib/app');
const request = require('supertest');
const mongoose = require('mongoose');
const User = require('../../lib/models/userSchema');

describe('herb routes', () => {
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

  it('can create a new herb', () => {
    let token = null;
    let userId = null;

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode@email.com',
        password: 'youllneverguess',
        profilePhoto: 'coolPhoto.jpg'
      })
      .then(res => {
        token = res.body.token;
        userId = res.body.user._id;

        return request(app)
          .post('/api/v1/herbs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'lobelia',
            category: 'nervine & antispasmodic',
            latin_name: 'lobelia inflata',
            medicinal_uses: 'cures everything',
            description: 'is a smart herb',
            user: userId
            
          })
          .then(res => {
            expect(res.body).toEqual({
              name: 'lobelia',
              category: 'nervine & antispasmodic',
              latin_name: 'lobelia inflata',
              medicinal_uses: 'cures everything',
              description: 'is a smart herb',
              _id: expect.any(String),
              user: expect.any(String),
              __v: 0
            });
          });
      });
  });
  it('can return a list of all herbs', () => {
    let token = null;
    let userId = null;

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode@email.com',
        password: 'youllneverguess',
        profilePhoto: 'coolPhoto.jpg'
      })
      .then(res => {
        token = res.body.token;
        userId = res.body.user._id;

        return request(app)
          .post('/api/v1/herbs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'lobelia',
            category: 'nervine & antispasmodic',
            latin_name: 'lobelia inflata',
            medicinal_uses: 'cures everything',
            description: 'is a smart herb',
            user: userId
            
          })
          .then(() => {
            return request(app)
              .get('/api/v1/herbs');
          })
          .then(res => {
            expect(res.body).toHaveLength(1);
          });
      });
  });
  it('get it by id', () => {
    let token = null;
    let userId = null;

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode@email.com',
        password: 'youllneverguess',
        profilePhoto: 'coolPhoto.jpg'
      })
      .then(res => {
        token = res.body.token;
        userId = res.body.user._id;
        return request(app)
          .post('/api/v1/herbs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'lobelia',
            category: 'nervine & antispasmodic',
            latin_name: 'lobelia inflata',
            medicinal_uses: 'cures everything',
            description: 'is a smart herb',
            user: userId
          });
      })
      .then(herb => {
        return request(app)
          .get(`/api/v1/herbs/${herb.body._id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'lobelia',
          category: 'nervine & antispasmodic',
          latin_name: 'lobelia inflata',
          medicinal_uses: 'cures everything',
          description: 'is a smart herb',
          user: userId,
          _id: expect.any(String)
        });
      });
  });
  it('get it by latin name', () => {
    let token = null;
    let userId = null;

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode@email.com',
        password: 'youllneverguess',
        profilePhoto: 'coolPhoto.jpg'
      })
      .then(res => {
        token = res.body.token;
        userId = res.body.user._id;

        return request(app)
          .post('/api/v1/herbs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'lobelia',
            category: 'nervine & antispasmodic',
            latin_name: 'lobelia inflata',
            medicinal_uses: 'cures everything',
            description: 'is a smart herb',
            user: userId
          });
      })
      .then(herb => {
        return request(app)
          .get(`/api/v1/herbs/latin-name/${herb.body.latin_name}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'lobelia',
          category: 'nervine & antispasmodic',
          latin_name: 'lobelia inflata',
          medicinal_uses: 'cures everything',
          description: 'is a smart herb',
          user: userId,
          _id: expect.any(String)
        });
      });
  });
});
