const User = require('../../lib/models/userSchema.js');
const mongoose = require('mongoose');
const { untokenize, tokenize } = require('../../lib/utils/token');

describe('test user schema', () => {
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
  it('creates a user', () => {
    const user = new User({
      email: 'intromode@email.com',
      password: 'youllneverguess',
      profilePhoto: 'coolPhoto.jpg'
    });

    expect(user.toJSON()).toEqual({
      email: 'intromode@email.com',
      profilePhoto: 'coolPhoto.jpg',
      _id: expect.any(mongoose.Types.ObjectId)
    });
    expect(user._tempPassword).toEqual('youllneverguess');
  });
  it('compares passwords', async() => {
    const user = new User({
      email: 'intromode@email.com',
      password: 'youllneverguess',
      profilePhoto: 'coolPhoto.jpg'
    });
    await user.save();


    const isSame = await user.compare('youllneverguess');
    const isNotSame = await user.compare('password');
    expect(isSame).toBeTruthy();
    expect(isNotSame).toBeFalsy();
  });

  it('can create an auth token', () => {
    const user = new User({
      email: 'intromode@email.com',
      password: 'youllneverguess',
      profilePhoto: 'coolPhoto.jpg'
    });
    const token = user.createToken();
    const payload = untokenize(token);
    
    
    expect(token).toEqual(expect.any(String));
    expect(payload).toEqual({     
      email: 'intromode@email.com',
      profilePhoto: 'coolPhoto.jpg',
      _id: expect.any(String)
    });
  });

  it('finds a token', () => {
    return User.create({
      email: 'intromode@email.com',
      password: 'youllneverguess',
      profilePhoto: 'coolPhoto.jpg'
    })
      .then(payload => {
        return tokenize(payload);
      })
      .then(token => {
        return User.findPayloadByToken(token);
      })
      .then(foundUser => {
        expect(foundUser).toEqual({
          email: 'intromode@email.com',
          profilePhoto: 'coolPhoto.jpg',
          _id: expect.any(String)
        });
      });
  });
});
