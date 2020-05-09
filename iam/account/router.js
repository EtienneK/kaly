const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const passport = require('passport');
require('./config/passport');

const router = express.Router();

router.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'secret134566',
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());

const accountController = require('./controllers/account');
router.get('/register', accountController.getRegister);

module.exports = router;
