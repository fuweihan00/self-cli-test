'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _git = require('./utils/git');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var rs;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(_chalk2.default.blue(_path2.default.resolve('neoTest')));
            _context.next = 3;
            return (0, _git.download)('https://github.com:fuweihan00/vuessr-test#master', _path2.default.resolve('neoTest')).catch(function (err) {
              return console.log(_chalk2.default.red(err));
            });

          case 3:
            rs = _context.sent;

            if (rs) console.log(_chalk2.default.green('success'));

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function install() {
    return _ref.apply(this, arguments);
  };
}();

install();