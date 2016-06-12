'use strict';

const debug = require('debug')('api:gif');
const randomstring = require('randomstring');

const config = require('../config');
const gifMaker = require('../util/gifmaker');

/**
 * Generate a gif sequence from the given images
 * @method POST /gif
 * @kind API
 * @return {Object} url to the generated gif
 */
function *gif() {
  try {
    const images = this.request.body.images || [];
    const fileName = this.request.body.fileName || `${randomstring.generate(4)}.gif`;
    yield gifMaker(images, fileName);
    this.body = {
      fileName: fileName,
      url: `${config.url}/public/${fileName}`
    };
    this.status = 201;
  } catch (e) {
    debug('GifMakerError: ', e);
    this.throw(e);
  }
}

module.exports = gif;
