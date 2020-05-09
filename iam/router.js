const express = require('express');

const accountRouter = require('./account/router');
const oidcRouter = require('./oidc/router');

const router = express.Router();
router.use('/account', accountRouter);
router.use('/oidc', oidcRouter);

module.exports = router;
