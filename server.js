require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./lib/app');
const PORT = process.env.PORT || 7890;

mongoose.connect('mongodb://localhost:27017/herbs', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(PORT, () => {
  console.log(`Server listening in on port:${PORT}`);
});
