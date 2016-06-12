'use strict';

const fs = require('fs');

const debug = require('debug')('api:gif');
const randomstring = require('randomstring');

const config = require('../config');

/**
 * Generate a gif sequence from the given images
 * @method POST /gif
 * @kind API
 * @return {Object} url to the generated gif
 */
function init(options) {
  const gifMaker = options.gifMaker;
  const azure = options.azure;

  function uploadToAzure(fileName, filePath) {
    return new Promise((resolve, reject) => {
      const blobService = azure.createBlobService(config.azure.accountName, config.azure.accountKey);
      blobService.createBlockBlobFromLocalFile(config.azure.containerName, fileName, filePath, (error, result, response) => {
        if (!error) {
          resolve(`${config.azure.baseUrl}/${config.azure.containerName}/${fileName}`);
        } else {
          reject('Azure upload error');
        }
      });
    });
  };

  return function *gif() {
    try {
      const images = this.request.body.images || [];
      const fileName = this.request.body.fileName || `${randomstring.generate(4)}.gif`;

      let filePath = yield gifMaker(images, fileName);
      if (config.azure.inUse === true || config.azure.inUse === 'true') {
        var fileUrl = yield uploadToAzure(fileName, filePath);
        try {
          fs.unlink(filePath);
        } catch (e) {}
      }
      this.body = {
        fileName: fileName,
        url: fileUrl || filePath
      };
      this.status = 201;
    } catch (e) {
      debug('GifMakerError: ', e);
      this.throw(e);
    }
  };
}

module.exports = init;
