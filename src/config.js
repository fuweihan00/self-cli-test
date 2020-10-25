import {
  get, set, remove, getAll, init,
} from './utils/rc';

const config = async (action, k, v) => {
  switch (action) {
    case 'init':
      await init();
      break;
    case 'get':
      if (k) {
        const value = await get(k);
        console.log(`${k}=${value}`);
      } else {
        const obj = await getAll();
        Reflect.ownKeys(obj).forEach((key) => {
          console.log(`${key}=${obj[key]}`);
        });
      }
      break;
    case 'set':
      set(k, v);
      break;
    case 'remove':
      remove(k);
      break;
    default:
      console.log('command not found');
  }
};

export default config;
