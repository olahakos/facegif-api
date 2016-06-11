'use strict';

const debug = require('debug')('api:status');

const config = require('../config');
const pkg = require('../../package.json');

/**
 * Display API status
 * @method GET /status
 * @kind API
 * @return {Object} an object with some basic infos about the API
 */
function *status() {
  const info = {
    name: pkg.name,
    version: pkg.version,
    env: config.env
  };

  debug(info);
  this.body = info;
  this.status = 200;
}

module.exports = status;
