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

config.azure = {
  inUse: process.env.AZURE_IN_USE || false,
  accountName: process.env.AZURE_STORAGE_ACCOUNT,
  accountKey: process.env.AZURE_STORAGE_ACCESS_KEY,
  baseUrl: process.env.AZURE_STORAGE_BASE_URL || 'http://facegif.blob.core.windows.net',
  containerName: process.env.AZURE_STORAGE_CONTAINER || 'facegif-upload-test'
};

config.tmpDir = path.join(__dirname, '../public');
config.url = process.env.URL || `http://localhost:${config.port}`;

debug(config);
module.exports = config;
