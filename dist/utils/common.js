"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var betterRequire = exports.betterRequire = function betterRequire(absPath) {
  var module = require(absPath);
  return module.default ? module.default : module;
};