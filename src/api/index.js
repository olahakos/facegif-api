'use strict';

const Router = require('koa-router');

const gifInit = require('./gif');
const status = require('./status');

const api = {
  public: new Router()
};

const gif = gifInit({
  azure: require('azure-storage'),
  gifMaker: require('../util/gifmaker')
});

api.public.get('/', status);
api.public.post('/gif', gif);

module.exports = api;
