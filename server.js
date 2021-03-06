const bootApp = require('./app');

const { PORT = 3000 } = process.env;

let server;
(async () => {
  const app = await bootApp();
  server = await app.listen(PORT, () => {
    console.log(`application is listening on port ${PORT}, check its /.well-known/openid-configuration`);
  });
})().catch((err) => {
  if (server && server.listening) server.close();
  console.error(err);
  process.exitCode = 1;
});
