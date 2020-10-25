'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULTS = exports.VERSION = exports.DOWNLOAD = exports.RC = undefined;

var _package = require('../../package.json');

var HOME = process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'];
var RC = exports.RC = HOME + '/.fwhTestCliRc';
var DOWNLOAD = exports.DOWNLOAD = HOME + '/.template';
var VERSION = exports.VERSION = _package.version;
var DEFAULTS = exports.DEFAULTS = {
  registry: 'https://github.com',
  group: 'fuweihan00'
};