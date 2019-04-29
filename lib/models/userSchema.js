const mongoose = require('mongoose');
const { hash, compare } = require('../../lib/utils/hash');
const { tokenize, untokenize } = require('../utils/token');

const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true,
    unique: true
  },
  passwordHash: String,
  profilePhoto: {
    type: String,
    default: 'https://www.medicalone.com.au/sites/default/files/styles/square_500x500_/public/default_images/c-doctor-placeholder.png?itok=3ca1ER0L'
  }
}, { toJSON: {
  transform: function(doc, ret) {
    delete ret.passwordHash,
    delete ret.__v;
  }
}
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  hash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.methods.createToken = function() {
  return tokenize(this.toJSON());
};

userSchema.statics.findPayloadByToken = function(token) {
  return Promise.resolve(untokenize(token));
};


module.exports = mongoose.model('User', userSchema);
