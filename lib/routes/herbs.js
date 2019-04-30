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
  });