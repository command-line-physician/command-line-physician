const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const Herb = require('../models/herbSchema');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      name,
      category,
      latin_name,
      medicinal_uses,
      description,
      user
    } = req.body;

    Herb
      .create({ name, latin_name, category, medicinal_uses, description, user })
      .then(createdHerb => res.send(createdHerb))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Herb
      .find()
      .select({
        __v: false,
      })
      .lean()
      .then(herb => res.send(herb))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    const { id } = req.params;
    Herb
      .findById(id)
      .select({
        __v: false
      })
      .lean()
      .then(herb => res.send(herb))
      .catch(next);
  })
  .get('/latin-name/:latin_name', (req, res, next) => {
    const { latin_name } = req.params;

    Herb
      .findOne({ latin_name })
      .select({
        __v: false
      })
      .lean()
      .then(herb => res.send(herb))
      .catch(next);
  })

  .patch('/:id', ensureAuth, (req, res, next) => {
    Herb
      .findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category,
        latin_name: req.body.latin_name,
        medicinal_uses: req.body.medicinal_uses,
        description: req.body.description,
      }, { new:true })
      .select({
        __v: false
      })
      .lean()
      .then(herb => res.send(herb))
      .catch(next); 
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    Herb
      .findByIdAndDelete(req.params.id)
      .select({
        __v: false
      })
      .lean()
      .then(herb => res.send(herb))
      .catch(next); 
  });
