'use strict';

const mongoose = require('mongoose');
// eslint-disable-next-line
console.log(process.env.MONGO_URI);
const connection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = connection;
