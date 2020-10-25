import downloadGit from 'download-git-repo';
import fse from 'fs-extra';
import { getAll } from './rc';
import { DOWNLOAD } from './constants';

export const download = async (src, dest) => new Promise((resolve, reject) => {
  downloadGit(src, dest, { clone: true }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(dest);
    }
  });
});

export const downloadLocal = async (project, version) => {
  try {
    const config = await getAll();
    let api = `${config.registry}:${config.group}/${project}`;
    if (version) {
      api += `#${version}`;
    }
    if (fse.existsSync(`${DOWNLOAD}/${project}`)) {
      fse.removeSync(`${DOWNLOAD}/${project}`);
    }
    return download(api, `${DOWNLOAD}/${project}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
