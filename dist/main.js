'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapAction = {
  install: {
    alias: 'i',
    description: 'install a template',
    examples: ['fwh-test-cli install <project-name>']
  },
  // config: {
  //   alias: 'c',
  //   description: 'config .dxclirc',
  //   examples: [
  //     'dx-cli config set <k> <v>',
  //     'dx-cli config get <k>',
  //     'dx-cli config remove <k>',
  //   ],
  // },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
};

Reflect.ownKeys(mapAction).forEach(function (action) {
  _commander2.default.command(action).alias(mapAction[action].alias).description(mapAction[action].description).action(function () {
    _index2.default.apply(undefined, [action].concat((0, _toConsumableArray3.default)(process.argv.slice(3))));
  });
});

_commander2.default.on('--help', function () {
  console.log('\r\nExamples:');
  Reflect.ownKeys(mapAction).forEach(function (action) {
    mapAction[action].examples.forEach(function (example) {
      console.log('   ' + example);
    });
  });
});

_commander2.default.version(_constants.VERSION, '-v --version').parse(process.argv);