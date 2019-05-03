const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const herbMiddleware = require('../middleware/herbFinder');
const Herb = require('../models/herbSchema');
const unwastedHerbMiddleware = require('../../lib/middleware/getUnwastedHerb');

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
  .get('/top-contributors', (req, res, next) => {
    Herb
      .topContributor()
      .then(topC =>  {
        res.send(topC);
      })
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
  .get('/findUnwastedHerbs/:name', unwastedHerbMiddleware, (req, res, next) => {
    const { name } = req.params;
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).trim();

    Herb
      .findOne({ name: formattedName })
      .select({
        __v: false,
      })
      .lean()
      .then(herb => {
        const unwastedHerbs = req.unwasted;
        res.send({ unwastedHerbs, herb });
      })
      .catch(next);
  })

  .get('/common-name/:name', herbMiddleware, (req, res, next) => {
    const { name } = req.params;
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).trim();

    Herb
      .findOne({ name: formattedName })
      .select({
        __v: false
      })
      .lean()
      .then(herb => {
        const herbStores = req.stores;
        res.send({ herbStores, herb });
      })
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
