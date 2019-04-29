const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const User = require('../models/userSchema');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      email,
      password,
      profilePhoto
    } = req.body;
    User
      .create({ email, password, profilePhoto })
      .then(user => {
        const token = user.createToken();
        res.send({ user, token });
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const {
      email,
      password
    } = req.body;

    User
      .findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('Invalid user!');
          error.status = 401;
          return next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ]);
      })
      .then(([user, result]) => {
        if(!result) {
          const error = new Error('Invalid authentication!');
          error.status = 401;
          return next(error);
        } else {
          res.send({
            token: user.createToken(),
            user
          });
        }
      });
  });


