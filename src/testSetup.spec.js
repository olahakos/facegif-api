'use strict';

const chai = require('chai');
const chaiSubset = require('chai-subset');
const chaiThings = require('chai-things');
const mongoose = require('mongoose');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const config = require('./config');

function connect() {
  return new Promise(resolve => {
    mongoose.connect(config.db.mongoUri);
    mongoose.connection.once('open', resolve);
  });
}

before(function *() {
  chai.use(chaiSubset);
  chai.use(chaiThings);
  chai.use(sinonChai);

  sinon.stub.resolves = function (toResolve) {
    return this.returns(Promise.resolve(toResolve));
  };

  sinon.stub.rejects = function (toReject) {
    return this.returns(Promise.reject(toReject));
  };

  yield connect();
});

beforeEach(function () {
  this.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  this.sandbox.restore();
});
