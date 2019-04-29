const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String, 
    required: true
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

module.exports = mongoose.model('User', userSchema);
