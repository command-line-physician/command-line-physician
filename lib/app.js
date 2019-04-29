const express = require('express');
const app = express();

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

//routes

app.use(require('./middleware/error'));
app.use(require('./middleware/not-found'));

module.exports = app;
