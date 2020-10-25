import { version } from '../../package.json';

const HOME = process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE'];
export const RC = `${HOME}/.fwhTestCliRc`;
export const DOWNLOAD = `${HOME}/.template`;
export const VERSION = version;
export const DEFAULTS = {
  registry: 'https://github.com',
  group: 'fuweihan00',
};
