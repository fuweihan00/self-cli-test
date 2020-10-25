'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var installDependency = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(projectName) {
    var _ref2, installType, i, installScript;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('\r\n Creating a new React app in ' + _chalk2.default.green(_path2.default.resolve(projectName) + '.') + ' \r\n ');
            _context.next = 3;
            return _inquirer2.default.prompt({
              name: 'installType',
              type: 'list',
              message: 'please choise a installType to install dependencies',
              choices: ['npm', 'cnpm', 'yarn']
            });

          case 3:
            _ref2 = _context.sent;
            installType = _ref2.installType;
            i = installType === 'yarn' ? 'yarn' : installType + ' install';

            console.log(_chalk2.default.cyan('\r\n cd ' + projectName + ' && ' + i + ' \u8BF7\u7B49\u5F85\u4E00\u4F1A\u231B\uFE0F...'));
            installScript = _child_process2.default.exec('cd ' + projectName + ' && ' + i);

            installScript.stdout.on('data', function (data) {
              console.log(data);
            });
            installScript.stderr.on('data', function (data) {
              console.log(data);
            });
            installScript.on('exit', function () {
              console.log(_chalk2.default.green('\u5B89\u88C5\u5B8C\u6BD5 \u8FD0\u884C cd ' + projectName + ' && npm start \u542F\u52A8\u9879\u76EE \r\n'));
            });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function installDependency(_x) {
    return _ref.apply(this, arguments);
  };
}();

var handelRender = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(files, metal, done) {
    var _this = this;

    var obj, promiseArr;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            obj = metal.metadata();
            promiseArr = [];

            Reflect.ownKeys(files).forEach(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(file) {
                var content, promise;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (file.includes('js') || file.includes('json')) {
                          content = files[file].contents.toString();

                          if (content.includes('<%')) {
                            promise = new Promise(function (resolve, reject) {
                              render(content, obj).then(function (contentFlow) {
                                files[file].contents = Buffer.from(contentFlow);
                                resolve();
                              }).catch(reject);
                            });

                            promiseArr.push(promise);
                          }
                        }

                      case 1:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x5) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context3.next = 5;
            return Promise.all(promiseArr).catch(function (err) {
              return console.log(_chalk2.default.red('\u274C -> render-' + err));
            });

          case 5:
            done();

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function handelRender(_x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var handleAsk = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(result, projectName) {
    var _this2 = this;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (_fs2.default.existsSync(_path2.default.join(result, 'ask.js'))) {
              _context5.next = 5;
              break;
            }

            _context5.next = 3;
            return ncpPromise(result, _path2.default.resolve(projectName));

          case 3:
            _context5.next = 7;
            break;

          case 5:
            _context5.next = 7;
            return new Promise(function (resolve, reject) {
              (0, _metalsmith2.default)(__dirname).source(result).destination(_path2.default.resolve(projectName)).use(function () {
                var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(files, metal, done) {
                  var args, obj, meta;
                  return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          args = require(_path2.default.join(result, 'ask.js'));
                          _context4.next = 3;
                          return _inquirer2.default.prompt(args).catch(function (err) {
                            return console.log(_chalk2.default.red('\u274C -> ask-' + err));
                          });

                        case 3:
                          obj = _context4.sent;

                          if (obj) {
                            meta = metal.metadata();

                            Object.assign(meta, obj);
                          }
                          delete files['ask.js'];
                          done();

                        case 7:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this2);
                }));

                return function (_x8, _x9, _x10) {
                  return _ref6.apply(this, arguments);
                };
              }()).use(handelRender).build(function (err) {
                if (err) {
                  reject();
                } else {
                  resolve();
                }
              });
            });

          case 7:
            installDependency(projectName);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function handleAsk(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ncp = require('ncp');

var _ncp2 = _interopRequireDefault(_ncp);

var _util = require('util');

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _consolidate = require('consolidate');

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _git = require('./utils/git');

var _constants = require('./utils/constants');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = _consolidate.ejs.render;

render = (0, _util.promisify)(render);
var ncpPromise = (0, _util.promisify)(_ncp2.default);

var install = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(projectName) {
    var loading, result;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!_fs2.default.existsSync(_constants.RC)) {
              (0, _config2.default)('init');
            }
            loading = (0, _ora2.default)('download project ......');
            _context6.prev = 2;

            loading.start();
            _context6.next = 6;
            return (0, _git.downloadLocal)('vuessr-test', 'master');

          case 6:
            result = _context6.sent;

            loading.succeed();
            handleAsk(result, projectName);
            _context6.next = 14;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6['catch'](2);

            loading.fail('download');

          case 14:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[2, 11]]);
  }));

  return function install(_x11) {
    return _ref7.apply(this, arguments);
  };
}();

exports.default = install;