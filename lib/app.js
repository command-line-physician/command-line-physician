const express = require('express');
const app = express();
const { bearerToken } = require('../lib/middleware/ensureAuth');
const mongoConnection = require('../lib/middleware/mongo-connection');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(express.json());

//routes
app.use(bearerToken);
app.use('/api/v1/auth', mongoConnection, require('./routes/auth'));
app.use('/api/v1/herbs', mongoConnection, require('./routes/herbs'));
app.use('/api/v1/faves', mongoConnection, require('./routes/faves'));

app.use(require('./middleware/error'));
app.use(require('./middleware/not-found'));

module.exports = app;
