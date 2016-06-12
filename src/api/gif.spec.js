'use strict';

const path = require('path');

const _ = require('lodash');
const bodyParser = require('koa-body');
const expect = require('chai').expect;
const koa = require('koa');
const request = require('co-supertest');

const config = require('../config');
const gifInitMiddleware = require('./gif');

describe('The gif creator endpoint', () => {
  let app;
  before(function *() {
    app = koa();
    app.use(bodyParser());
    const gifMiddleware = gifInitMiddleware({
      azure: null,
      gifMaker: (imgArr, fileName) => (Promise.resolve(path.join(config.tmpDir, fileName)))
    });
    app.use(gifMiddleware);
  });

  const urlTestArr = {
    images: [
      'http://cdstorage.azureedge.net/clipdis-app-clips/5416cbb4f6ece1d465f53775.jpg',
      'http://cdstorage.azureedge.net/clipdis-app-clips/56fbd92f3b5a2a1200f90535.jpg',
      'http://cdstorage.azureedge.net/clipdis-app-clips/55a61dfafd24702626af5104.jpg'
    ]
  };
  const fileNameObj = {fileName: 'output.gif'};
  it('should return the generated gif if we call it without the fileName parameter.', function *() {
    this.timeout(5000);
    const gifUrl = yield request(app.listen())
      .post('/gif')
      .send(urlTestArr);

    expect(gifUrl.body)
      .to.be.ok
      .to.have.any.keys('url')
      .to.have.any.keys('fileName');
  });

  it('should return the generated gif if we call it with the fileName parameter.', function *() {
    this.timeout(5000);
    const gifUrl = yield request(app.listen())
      .post('/gif')
      .send(_.merge({}, urlTestArr, fileNameObj));

    expect(gifUrl.body)
      .to.be.ok
      .to.have.any.keys('url')
      .to.containSubset(fileNameObj);
  });
});
