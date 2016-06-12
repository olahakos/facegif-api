'use strict';

const config = require('./src/config');

const bodyParser = require('koa-body');
const debug = require('debug')('app');
const koa = require('koa');
const mongoose = require('mongoose');
const mount = require('koa-mount');
const serve = require('koa-static');

const api = require('./src/api');
const pkg = require('./package.json');

const app = koa();
app.use(serve('./public'));

app.use(mount('/', bodyParser()));
app.use(mount('/', api.public.middleware()));

const db = mongoose.connection;
db.on('error', debug);

mongoose.connect(config.db.mongoUri, {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
});

function start () {
  app.listen(config.port, () => {
    debug(`Server is listening on ${config.port}`, {
      name: pkg.name,
      version: pkg.version,
      env: config.env
    });
  });
}

db.once('open', () => {
  debug('Database connection alive.');
  start();
});

module.exports = app;
