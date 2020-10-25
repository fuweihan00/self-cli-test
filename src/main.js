import program from 'commander';
import { VERSION } from './utils/constants';
import main from './index';

const mapAction = {
  install: {
    alias: 'i',
    description: 'install a template',
    examples: ['fwh-test-cli install <project-name>'],
  },
  config: {
    alias: 'c',
    description: 'config .fwhTestCliRc',
    examples: [
      'fwh-test-cli config set <k> <v>',
      'fwh-test-cli config get <k>',
      'fwh-test-cli config remove <k>',
    ],
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: [],
  },
};

Reflect.ownKeys(mapAction).forEach((action) => {
  program.command(action)
    .alias(mapAction[action].alias)
    .description(mapAction[action].description)
    .action(() => {
      main(action, ...process.argv.slice(3));
    });
});

program.on('--help', () => {
  console.log('\r\nExamples:');
  Reflect.ownKeys(mapAction).forEach((action) => {
    mapAction[action].examples.forEach((example) => {
      console.log(`   ${example}`);
    });
  });
});

program.version(VERSION, '-v --version').parse(process.argv);
