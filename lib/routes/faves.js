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
  })
  .get('/:id', ensureAuth, (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    Fave
      .find({ user: id })
      .select({ __v: false })
      .lean()
      .then(faves => {
        console.log(faves);
        res.send(faves);
      })
      .catch(next); 
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Fave
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(deletedFave => res.send(deletedFave))
      .catch(next);
  });
