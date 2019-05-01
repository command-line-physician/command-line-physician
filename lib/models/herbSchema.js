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
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
});

herbSchema.statics.topContributor = function() {
  return this.aggregate([
    {
      '$group': {
        '_id': '$user', 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$sort': {
        'count': -1
      }
    }, {
      '$limit': 3
    }
  ]);
};


module.exports = mongoose.model('Herb', herbSchema);

