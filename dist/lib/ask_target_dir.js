'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = askTargetDir;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _clear = require('clear');

var _clear2 = _interopRequireDefault(_clear);

var _helpers = require('./helpers.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function askTargetDir(dir, callback) {
  (0, _clear2.default)();

  var questions = [{
    type: 'list',
    name: 'target_path',
    message: 'Where do you want to place your project?'
  }];
  questions[0].choices = ['.', '..'].concat(_fs2.default.readdirSync(dir)).filter(function (file) {
    return _fs2.default.statSync(_path2.default.resolve(dir, file)).isDirectory();
  });

  _inquirer2.default.prompt(questions, function (answers) {
    var chosen = _path2.default.resolve(dir, answers.target_path);

    if (answers.target_path !== '.' && (0, _helpers.isDir)(chosen)) {
      return askTargetDir(chosen, callback);
    }

    callback(chosen);
  });
}