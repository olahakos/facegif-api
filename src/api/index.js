'use strict';

const Router = require('koa-router');

const status = require('./status');

const api = {
  public: new Router()
};

api.public.get('/', status);

module.exports = api;
