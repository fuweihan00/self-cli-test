'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

// let { render } = ejs;
// render = promisify(render);

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
// import fs from 'fs';
// import ncp from 'ncp';
// import { promisify } from 'util';
// import MetalSmith from 'metalsmith';
// import { ejs } from 'consolidate';


var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _git = require('./utils/git');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(projectName) {
    var loading;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            loading = (0, _ora2.default)('download project ......');

            loading.start();
            _context2.prev = 2;
            _context2.next = 5;
            return (0, _git.download)('https://github.com:fuweihan00/vuessr-test#master', _path2.default.resolve(projectName)).catch;

          case 5:
            loading.succeed();
            installDependency(projectName);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](2);

            loading.fail(_context2.t0);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[2, 9]]);
  }));

  return function install(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.default = install;