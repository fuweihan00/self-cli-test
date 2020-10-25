import { resolve } from 'path';
import { betterRequire } from './utils/common';

const apply = (action, ...args) => {
  betterRequire(resolve(__dirname, `./${action}`))(...args); // 默认导出
};
export default apply;
