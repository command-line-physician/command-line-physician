require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');
const PORT = process.env.PORT || 7890;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(PORT, () => {
  console.log(`Server listening in on port:${PORT}`);
});
