const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const Fave = require('../../lib/models/faveSchema');

module.exports = Router() 
  .post('/', ensureAuth, (req, res, next) => {
    const {
      user,
      herb
    } = req.body;
    Fave
      .create({
        user,
        herb
      })
      .then(createdFave => res.send(createdFave))
      .catch(next); 
  });
