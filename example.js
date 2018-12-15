'use strict';

console.time('total');
process.on('exit', () => console.timeEnd('total'));
const paths = require('./');
console.log(paths());
