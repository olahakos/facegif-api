'use strict';

const Router = require('koa-router');

const gif = require('./gif');
const status = require('./status');

const api = {
  public: new Router()
};

api.public.get('/', status);
api.public.post('/gif', gif);

module.exports = api;
