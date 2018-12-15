'use strict';

require('mocha');
const path = require('path');
const assert = require('assert');
const gm = require('global-modules');
const paths = require('./');
const isWindows = process.platform === 'win32'
  || process.env.OSTYPE === 'msys'
  || process.env.OSTYPE === 'cygwin';

describe('paths', () => {
  it('should return an array of directories', () => {
    assert(paths().length > 1);
  });

  it('should include node_modules in the cwd', () => {
    assert(paths().includes(path.join(process.cwd(), 'node_modules')));
  });

  it('should include /node_modules', () => {
    assert(paths().includes('/node_modules'));
  });

  it('should include APPDATA path on windows', function() {
    if (!isWindows) {
      this.skip();
      return;
    }
    let dir = path.join(process.env.APPDATA, 'npm', 'node_modules');
    assert(paths().includes(dir));
  });

  it('should include npm global modules', () => {
    assert(paths().includes(gm));
  });
});
