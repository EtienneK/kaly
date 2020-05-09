const { Provider } = require('oidc-provider');
const Account = require('./support/account');
const configuration = require('./support/configuration');

const { ISSUER = `http://localhost:3000` } = process.env;

configuration.findAccount = Account.findAccount;

let adapter;
if (process.env.MONGODB_URI) {
  adapter = require('./adapters/mongodb');
  adapter.connect(); // TODO: Make this async
}

const provider = new Provider(ISSUER, { adapter, ...configuration });

module.exports = provider;
