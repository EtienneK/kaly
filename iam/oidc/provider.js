const { Provider } = require('oidc-provider');
const Account = require('./support/account');
const adapter = require('./adapters/mongodb');
const configuration = require('./support/configuration');

const { ISSUER = `http://localhost:3000` } = process.env;

configuration.findAccount = Account.findAccount;

const provider = new Provider(ISSUER, { adapter, ...configuration });

module.exports = provider;
