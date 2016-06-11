'use strict';

const path = require('path');

const expect = require('chai').expect;
const FFmpeg = require('fluent-ffmpeg');

const config = require('../config');
const gifMaker = require('./gifmaker');

describe('The gifMaker module', () => {
  const urlTestArr = [
    'http://cdstorage.azureedge.net/clipdis-app-clips/5416cbb4f6ece1d465f53775.jpg',
    'http://cdstorage.azureedge.net/clipdis-app-clips/53bfca62bcaa800f7eacfda7.jpg',
    'http://cdstorage.azureedge.net/clipdis-app-clips/5416cbb4f6ece1d465f53775.jpg'];

  const pathTestArr = [
    path.join(__dirname, '../../mock/1.jpg'),
    path.join(__dirname, '../../mock/2.jpg'),
    path.join(__dirname, '../../mock/3.jpg')];

  const outputFileName = 'out.gif';

  function checkFile(filePath) {
    return new Promise(function(resolve, reject) {
      FFmpeg
        .ffprobe(filePath, (err, metadata) => {
          if (err) {
            return reject(err);
          }
          resolve(metadata);
        });
    });
  }

  it('should throw error for empty input', function *() {
    const url = yield gifMaker();
    expect(url).to.be.an('error');
  });

  it('should throw error for not Array input type', function *() {
    const url = yield gifMaker('wrong type');
    expect(url).to.be.an('error');
  });

  it('should throw error if in the parameter array not all elements are urls', function *() {
    const url = yield gifMaker(['http://asdf.hu/asdf.jpg', 'notUrl']);
    expect(url).to.be.an('error');
  });

  it('should throw error if the outputPath parameter is missing', function *() {
    const url = yield gifMaker(pathTestArr);
    expect(url).to.be.an('error');
  });

  it('should return with a path to the concatenated gif from URLs', function *() {
    const url = yield gifMaker(urlTestArr, outputFileName);
    const fileMetadata = yield checkFile(url);
    expect(fileMetadata.format).to.containSubset({
      format_name: 'gif',
      filename: path.join(config.tmpDir, outputFileName)
    });
    expect(fileMetadata.streams[0]).to.containSubset({
      codec_name: 'gif'
    });
  });

  it('should return with a path to the concatenated gif from Paths', function *() {
    const url = yield gifMaker(pathTestArr, outputFileName);
    const fileMetadata = yield checkFile(url);
    expect(fileMetadata.format).to.containSubset({
      format_name: 'gif',
      filename: path.join(config.tmpDir, outputFileName)
    });
    expect(fileMetadata.streams[0]).to.containSubset({
      codec_name: 'gif'
    });
  });
});
