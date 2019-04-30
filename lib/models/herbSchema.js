const mongoose = require('mongoose');

const herbSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  latin_name: {
    type: String,
    required: true,
    unique: true
  },
  medicinal_uses: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Herb', herbSchema);

