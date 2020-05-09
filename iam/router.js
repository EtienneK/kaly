const express = require('express');

const accountRouter = require('./account/router');

const router = express.Router();
router.use('/account', accountRouter);

module.exports = router;
