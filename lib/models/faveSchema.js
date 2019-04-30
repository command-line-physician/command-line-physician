const mongoose = require('mongoose');

const faveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  herb: {
    type: mongoose.Types.ObjectId,
    ref: 'Herb',
    required: true
  }
});

module.exports = mongoose.model('Fave', faveSchema);
