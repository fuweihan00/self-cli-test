import chalk from 'chalk';
import path from 'path';
import { download } from './utils/git';

const install = async () => {
  console.log(chalk.blue(path.resolve('neoTest')));
  const rs = await download('https://github.com:fuweihan00/vuessr-test#master', path.resolve('neoTest')).catch((err) => console.log(chalk.red(err)));
  if (rs) console.log(chalk.green('success'));
};

install();
