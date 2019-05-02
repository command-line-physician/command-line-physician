const authHandler = require('./handlers/auth');
const browseHandler = require('./handlers/browse');

authHandler()
  .then(() => browseHandler());
