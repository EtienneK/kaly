const express = require('express');
const helmet = require('helmet');
const path = require('path');

const iamRouter = require('./iam/router');

const app = express();

app.set('views', [
  path.join(__dirname, 'iam/account/views'),
  path.join(__dirname, 'iam/oidc/views'),
]);
app.set('view engine', [ 'pug', 'ejs' ]);

app.use(helmet());

app.use('/iam', iamRouter);

module.exports = app;
