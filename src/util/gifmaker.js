'use strict';

const path = require('path');
const fs = require('fs');

const debug = require('debug')('util:gifMaker');
const im = require('imagemagick');
const validator = require('validator');

const config = require('../config');

/**
 * Concatenate the given images into a .gif
 * @param  {Array} imgArr         Array of image urls or paths
 * @param  {string} outputFileName name of the output GIF
 * @return {string}                path of the GIF
 */
function *gifMaker(imgArr, outputFileName) {
  debug('input params:', imgArr, outputFileName);
  try {
    checkParams(imgArr, outputFileName);
  } catch (err) {
    return err;
  }
  ensureExistsTmp(config.tmpDir);
  const outputFilePath = path.join(config.tmpDir, outputFileName);
  try {
    yield concatenateImages(imgArr, outputFilePath);
  } catch (err) {
    throw new Error(err);
  }

  return outputFilePath;
}

/**
 * Ensure to Exists the tmp directory
 * @param  {string} tmpDir path of the tmp directory
 * @return {Promise}
 */
function ensureExistsTmp(tmpDir) {
  if (!fs.existsSync(tmpDir)) {
    return fs.mkdirSync(tmpDir);
  }
}

/**
 * Concatenate the images with imagemagick
 * @param  {Array} imgArr         Array of images
 * @param  {string} outputFilePath path of the output GIF
 * @return {Promise}
 */
function concatenateImages(imgArr, outputFilePath) {
  return new Promise((resolve, reject) => {
    let args = [].concat(['-delay', 30], imgArr, outputFilePath);
    im.convert(args, (err, stdout) => {
      if (err) { throw err; };
      return resolve();
    });
  });
}

/**
 * Validate the parameters
 * @param  {Array} imgArr Array of image urls or paths
 * @param  {string} outputFileName name of the output GIF
 * @return {Boolean}  are the params valid?
 */
function checkParams(imgArr, outputFile) {
  if (!imgArr || !Array.isArray(imgArr) || !imgArr.length || !outputFile) {
    debug('Parameter Error');
    throw new Error('Parameter Error');
  }
  const isAllUrl = imgArr
    .every((item) => {
      return validator.matches(item, /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/);
    });
  if (!isAllUrl) {
    throw new Error('Parameter Error');
  }

  return true;
}

module.exports = gifMaker;
