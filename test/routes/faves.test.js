const { getHerb } = require('../../lib/data/data-helpers');
const app = require('../../lib/app');
const request = require('supertest');
const mongoose = require('mongoose');
const Fave = require('../../lib/models/faveSchema');
const seedData = require('../../lib/data/seed-data');

describe('faves routes', () => {
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

  beforeEach(() => {
    return seedData();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('tests seedData import', () => {
    return request(app)
      .get('/api/v1/herbs')
      .then(herbs => {
        expect(herbs.body).toHaveLength(22);
      });
  });

  it('can create a fave', async() => {
    let token = null;
    let userId = null;

    const testerHerb = await getHerb();
    
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode@email.com',
        password: 'youllneverguess',
        profilePhoto: 'coolPhoto.jpg'
      })
      .then(user => {
        token = user.body.token;
        userId = user.body.user._id;
        return request(app)
          .post('/api/v1/faves')
          .set('Authorization', `Bearer ${token}`)
          .send({
            user: userId,
            herb: testerHerb
          });
      })
      .then(res => {
        expect(res.body).toEqual({
          user: expect.any(String),
          herb: expect.any(String),
          _id: expect.any(String),
          __v: 0
        });
      });
  });
  it('can get a favorite by id', () => {
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

        return Promise.all([request(app)
          .post('/api/v1/herbs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'lobelia',
            category: 'nervine & antispasmodic',
            latin_name: 'lobelia inflata',
            medicinal_uses: 'cures everything',
            description: 'is a smart herb',
            user: userId
          }), request(app)
          .post('/api/v1/herbs')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'lobeliaaaaa',
            category: 'nervine & antispasmodic',
            latin_name: 'lobelia inflata',
            medicinal_uses: 'cures everything',
            description: 'is a smart herb',
            user: userId
          })
        ]);
      })
      .then(([herb1, herb2]) => {
        return Promise.all([
          request(app)
            .post('/api/v1/faves')
            .set('Authorization', `Bearer ${token}`)
            .send({
              herb: herb1.body._id,
              user: userId
            }), request(app)
            .post('/api/v1/faves')
            .set('Authorization', `Bearer ${token}`)
            .send({
              herb: herb2.body._id,
              user: userId
            })
        ]);
      })
      .then(() => {
        return request(app)
          .get(`/api/v1/faves/${userId}`)
          .set('Authorization', `Bearer ${token}`);
      })
      .then(res => {
        expect(res.body).toHaveLength(2);
      });

  });
});
