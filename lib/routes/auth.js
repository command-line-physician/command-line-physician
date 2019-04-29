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
  });
