'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _rc = require('./utils/rc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, k, v) {
    var value, obj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = action;
            _context.next = _context.t0 === 'init' ? 3 : _context.t0 === 'get' ? 6 : _context.t0 === 'set' ? 18 : _context.t0 === 'remove' ? 20 : 22;
            break;

          case 3:
            _context.next = 5;
            return (0, _rc.init)();

          case 5:
            return _context.abrupt('break', 23);

          case 6:
            if (!k) {
              _context.next = 13;
              break;
            }

            _context.next = 9;
            return (0, _rc.get)(k);

          case 9:
            value = _context.sent;

            console.log(k + '=' + value);
            _context.next = 17;
            break;

          case 13:
            _context.next = 15;
            return (0, _rc.getAll)();

          case 15:
            obj = _context.sent;

            Reflect.ownKeys(obj).forEach(function (key) {
              console.log(key + '=' + obj[key]);
            });

          case 17:
            return _context.abrupt('break', 23);

          case 18:
            (0, _rc.set)(k, v);
            return _context.abrupt('break', 23);

          case 20:
            (0, _rc.remove)(k);
            return _context.abrupt('break', 23);

          case 22:
            console.log('command not found');

          case 23:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function config(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = config;