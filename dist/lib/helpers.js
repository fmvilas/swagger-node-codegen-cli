'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDir = isDir;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isDir(path) {
  try {
    return _fs2.default.statSync(path).isDirectory(path);
  } catch (e) {
    return false;
  }
}