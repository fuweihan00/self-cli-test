'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadLocal = exports.download = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _rc = require('./rc');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var download = exports.download = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(src, dest) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              (0, _downloadGitRepo2.default)(src, dest, { clone: true }, function (err) {
                if (err) {
                  reject(err);
                } else {
                  resolve(dest);
                }
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function download(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var downloadLocal = exports.downloadLocal = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(project, version) {
    var config, api;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _rc.getAll)();

          case 3:
            config = _context2.sent;
            api = config.registry + ':' + config.group + '/' + project;

            if (version) {
              api += '#' + version;
            }
            if (_fsExtra2.default.existsSync(_constants.DOWNLOAD + '/' + project)) {
              _fsExtra2.default.removeSync(_constants.DOWNLOAD + '/' + project);
            }
            return _context2.abrupt('return', download(api, _constants.DOWNLOAD + '/' + project));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', Promise.reject(_context2.t0));

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 10]]);
  }));

  return function downloadLocal(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();