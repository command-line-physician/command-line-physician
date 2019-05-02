const app = require('../../lib/app');
const request = require('supertest');
const mongoose = require('mongoose');
const seedData = require('../../lib/data/seed-data');
const { getHerb } = require('../../lib/data/data-helpers');

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

  beforeEach(() => {
    return seedData();
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
        email: 'intromode7@email.com',
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
        email: 'intromode8@email.com',
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
            expect(res.body).toHaveLength(23);
          });
      });
  });
  it('get it by id', () => {
    let token = null;
    let userId = null;

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode9@email.com',
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
        email: 'intromode10@email.com',
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
  it('get it by common name', () => {
    let token = null;
    let userId = null;

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode10@email.com',
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
            name: 'wormwood',
            category: 'nervine & antispasmodic',
            latin_name: 'lobelia inflata',
            medicinal_uses: 'cures everything',
            description: 'is a smart herb',
            user: userId
          });
      })
      .then(herb => {
        return request(app)
          .get(`/api/v1/herbs/common-name/${herb.body.name}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          herb: { name: 'wormwood',
            category: 'nervine & antispasmodic',
            latin_name: 'lobelia inflata',
            medicinal_uses: 'cures everything',
            description: 'is a smart herb',
            user: userId,
            _id: expect.any(String)
          },
          herbStores: [
            {
              storeAddress: '110 SE 28th Ave, Portland, OR 97214, USA',
              storeName: 'Artemisia Collage With Nature',
            },
            {
              storeAddress: '116 NE Russell St, Portland, OR 97212, USA',
              storeName: 'The Secret Society',
            }
          ]
        });
      });
  });
  it('updates an herb by signed in user', () => {
    let token = null;
    let userId = null;

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode11@email.com',
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
          .patch(`/api/v1/herbs/${herb.body._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'lobellia',
            category: 'sweat',
            latin_name: 'fhdjshfk',
            medicinal_uses: 'all things',
            description: 'does all the things',
            user: userId
          });

      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'lobellia',
          category: 'sweat',
          latin_name: 'fhdjshfk',
          medicinal_uses: 'all things',
          description: 'does all the things',
          user: userId,
          _id: expect.any(String)
        });
      });
  });
  it('deletes a herb by id', () => {
    let token = null;
    let userId = null;

    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'intromode12@email.com',
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
      .then(createdHerb => {
        return request(app)
          .delete(`/api/v1/herbs/${createdHerb.body._id}`)
          .set('Authorization', `Bearer ${token}`);
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
  it('tests that there are no more than 3 top contribs', () => {
    return request(app)
      .get('/api/v1/herbs/top-contributors')
      .then(res => {
        expect(res.body).toHaveLength(3);
      });
  });
  it('connects with unwasted api', async() => {
    const testerHerb = await getHerb();
    return request(app)
      .get(`/api/v1/herbs/findUnwastedHerbs/${testerHerb.name}`)
      .then(res => {
        expect(res.body).toEqual({
          herb: {
            _id: expect.any(String),
            category: expect.any(String),
            latin_name: expect.any(String),
            name: testerHerb.name,
            user: expect.any(String),
            medicinal_uses: expect.any(String),
            description: expect.any(String)
          },
          unwastedHerbs:[{ 
            unwastedExpiration: expect.any(String),
            unwastedPostedDate: expect.any(String),
            unwastedTitle: testerHerb.name.toLowerCase(),
            unwastedUser: expect.any(String) }
          ]
        });
      });
  });
});
