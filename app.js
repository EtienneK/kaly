const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

const iamRouter = require('./iam/router');

const app = express();

app.set('views', [
  path.join(__dirname, 'iam/account/views'),
  path.join(__dirname, 'iam/oidc/views'),
]);
app.set('view engine', ['pug', 'ejs']);

app.use(helmet());

app.use('/iam', iamRouter);

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    throw error;
  }
  return app;
};
