'use strict';

const path = require('path');
const Module = require('module');
const gm = require('global-modules');

module.exports = cwd => {
  // backwards compatibility
  if (cwd && typeof cwd === 'object') cwd = cwd.cwd;

  let isWindows = process.platform === 'win32'
    || process.env.OSTYPE === 'msys'
    || process.env.OSTYPE === 'cygwin';

  let paths = new Set(Module._nodeModulePaths(cwd || process.cwd()));
  paths.add(gm);

  if (process.env.NODE_PATH) {
    // this really should be avoided, see https://github.com/nodejs/node/issues/9372
    process.env.NODE_PATH.split(path.delimiter).forEach(dir => paths.add(dir));
  } else if (isWindows) {
    paths.add(path.join(process.env.APPDATA, 'npm', 'node_modules'));
  } else {
    paths.add('/usr/lib/node_modules');
  }

  return [...paths];
};
