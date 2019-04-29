const UserSchema = require('../../lib/models/userSchema.js');
const mongoose = require('mongoose');

describe('test user schema', () => {
  it('creates a user', () => {
    const user = new UserSchema({
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
  it('compares passwords', () => {
    const user = new UserSchema({
      email: 'intromode@email.com',
      password: 'youllneverguess',
      profilePhoto: 'coolPhoto.jpg'
    });

    const isSame = user.compare(user.password);
    const isNotSame = user.compare('password');
    expect(isSame).toBeTruthy;
    expect(isNotSame).toBeFalsy;
  });

  it('can create an auth token', () => {
    const user = new UserSchema({
      email: 'intromode@email.com',
      password: 'youllneverguess',
      profilePhoto: 'coolPhoto.jpg'
    });
    const token = user.authToken();
    expect(token).toEqual(expect.any(String));
    console.log(user);
  });
});
