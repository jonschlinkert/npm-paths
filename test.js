'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
var gm = require('global-modules');
var paths = require('./');

describe('paths', function() {
  it('should return an array of directories:', function() {
    assert.equal(paths().length > 1, true);
  });

  it('should include the cwd', function() {
    var fp = path.join(process.cwd(), 'node_modules');
    assert.equal(paths().indexOf(fp) > -1, true);
  });

  it('should include npm global modules', function() {
    assert.equal(paths().indexOf(gm) > -1, true);
  });
});
