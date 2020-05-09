const express = require('express');
const routes = require('./routes/express');
const provider = require('./provider');

const router = express.Router();

routes(router, provider);
router.use(provider.callback);

module.exports = router;
