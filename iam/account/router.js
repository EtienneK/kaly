const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const { getInstalledPathSync } = require('get-installed-path')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
require('./config/passport');
const path = require('path');
const sass = require('node-sass-middleware');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
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
router.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));

router.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
const bootstrapPath = getInstalledPathSync('bootstrap', { local: true });
router.use('/js/lib', express.static(path.join(bootstrapPath, 'dist/js'), { maxAge: 31557600000 }));
const jqueryPath = getInstalledPathSync('jquery', { local: true });
router.use('/js/lib', express.static(path.join(jqueryPath, 'dist'), { maxAge: 31557600000 }));
const fortawesomePath = getInstalledPathSync('@fortawesome/fontawesome-free', { local: true });
router.use('/webfonts', express.static(path.join(fortawesomePath, 'webfonts'), { maxAge: 31557600000 }));

const accountController = require('./controllers/account');
router.get('/register', accountController.getRegister);
router.post('/register', accountController.postRegister);

module.exports = router;
