'use strict';

const path = require('path');

const debug = require('debug')('config');

const config = {};

config.env = process.env.NODE_ENV;
config.isProd = config.env === 'production';
config.isTest = config.env === 'test';

config.port = process.env.PORT || 3000;

config.db = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/facegif'
};

config.tmpDir = path.join(__dirname, '../', 'tmp');

debug(config);
module.exports = config;
