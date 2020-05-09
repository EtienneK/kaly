const passport = require('passport');
const Account = require('../../oidc/support/account');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.accountId);
});

passport.deserializeUser((id, done) => {
  Account.findByLogin(id, (err, user) => {
    done(err, user);
  });
});
