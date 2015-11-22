import fs from 'fs';

export function isDir (path) {
  try {
    return fs.statSync(path).isDirectory(path);
  } catch (e) {
    return false;
  }
}
