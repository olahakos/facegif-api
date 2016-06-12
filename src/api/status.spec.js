'use strict';

const koa = require('koa');
const request = require('co-supertest');

const config = require('../config');
const pkg = require('../../package.json');
const statusMiddleware = require('./status');

describe('The status endpoint', () => {
  let app;
  before(function *() {
    app = koa();
    app.use(statusMiddleware);
  });

  it('should return with status code and body w/o Auth header', function *() {
    yield request(app.listen())
      .get('/')
      .expect(200, {
        name: pkg.name,
        version: pkg.version,
        env: config.env
      });
  });
});
