import ora from 'ora';
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs';
import ncp from 'ncp';
import { promisify } from 'util';
import MetalSmith from 'metalsmith';
import { ejs } from 'consolidate';
import process from 'child_process';
import chalk from 'chalk';
import { downloadLocal } from './utils/git';
import { RC } from './utils/constants';
import config from './config';

let { render } = ejs;
render = promisify(render);
const ncpPromise = promisify(ncp);

async function installDependency(projectName) {
  console.log(`\r\n Creating a new React app in ${chalk.green(`${path.resolve(projectName)}.`)} \r\n `);
  const { installType } = await inquirer.prompt({
    name: 'installType',
    type: 'list',
    message: 'please choise a installType to install dependencies',
    choices: ['npm', 'cnpm', 'yarn'],
  });
  const i = installType === 'yarn' ? 'yarn' : `${installType} install`;
  console.log(chalk.cyan(`\r\n cd ${projectName} && ${i} 请等待一会⌛️...`));
  const installScript = process.exec(`cd ${projectName} && ${i}`);
  installScript.stdout.on('data', (data) => {
    console.log(data);
  });
  installScript.stderr.on('data', (data) => {
    console.log(data);
  });
  installScript.on('exit', () => {
    console.log(chalk.green(`安装完毕 运行 cd ${projectName} && npm start 启动项目 \r\n`));
  });
}

async function handelRender(files, metal, done) {
  const obj = metal.metadata();
  const promiseArr = [];
  Reflect.ownKeys(files).forEach(async (file) => {
    if (file.includes('js') || file.includes('json')) {
      const content = files[file].contents.toString();
      if (content.includes('<%')) {
        const promise = new Promise((resolve, reject) => {
          render(content, obj)
            .then((contentFlow) => {
              files[file].contents = Buffer.from(contentFlow);
              resolve();
            })
            .catch(reject);
        });
        promiseArr.push(promise);
      }
    }
  });
  await Promise.all(promiseArr).catch((err) => console.log(chalk.red(`❌ -> ${err}`)));
  done();
}

async function handleAsk(result, projectName) {
  if (!fs.existsSync(path.join(result, 'ask.js'))) {
    await ncpPromise(result, path.resolve(projectName));
  } else {
    await new Promise((resolve, reject) => {
      MetalSmith(__dirname)
        .source(result)
        .destination(path.resolve(projectName))
        .use(async (files, metal, done) => {
          const args = require(path.join(result, 'ask.js'));
          const obj = await inquirer.prompt(args).catch((err) => console.log(chalk.red(`❌ -> ${err}`)));
          if (obj) {
            const meta = metal.metadata();
            Object.assign(meta, obj);
          }
          delete files['ask.js'];
          done();
        })
        .use(handelRender)
        .build((err) => {
          if (err) {
            reject();
          } else {
            resolve();
          }
        });
    });
  }
  installDependency(projectName);
}

const install = async (projectName) => {
  if (!fs.existsSync(RC)) {
    config('init');
  }
  const loading = ora('download project ......');
  try {
    loading.start();
    const result = await downloadLocal('fuweihan00', 'master');
    loading.succeed();
    handleAsk(result, projectName);
  } catch (error) {
    loading.fail(error);
  }
};

export default install;
