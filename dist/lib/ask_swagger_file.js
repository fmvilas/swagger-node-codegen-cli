'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = askDefinitionFile;

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

function askDefinitionFile(dir, callback) {
  (0, _clear2.default)();

  var questions = [{
    type: 'list',
    name: 'swagger_path',
    message: 'Where is the swagger definition file?'
  }];
  questions[0].choices = ['..'].concat(_fs2.default.readdirSync(dir));

  _inquirer2.default.prompt(questions, function (answers) {
    var chosen = _path2.default.resolve(dir, answers.swagger_path);

    if ((0, _helpers.isDir)(chosen)) {
      return askDefinitionFile(chosen, callback);
    }

    callback(chosen);
  });
}