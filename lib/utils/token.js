require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '1d' });
};

const untokenize = token => {
  try {
    return jwt.verify(token, process.env.AUTH_SECRET).payload;
  }
  catch(error) {
    throw 'Bogus Token';
  }
};

module.exports = {
  tokenize,
  untokenize
};
