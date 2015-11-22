'use strict';

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _swaggerNodeCodegen = require('swagger-node-codegen');

var _swaggerNodeCodegen2 = _interopRequireDefault(_swaggerNodeCodegen);

var _ask_swagger_file = require('./lib/ask_swagger_file.js');

var _ask_swagger_file2 = _interopRequireDefault(_ask_swagger_file);

var _ask_target_dir = require('./lib/ask_target_dir.js');

var _ask_target_dir2 = _interopRequireDefault(_ask_target_dir);

var _helpers = require('./lib/helpers.js');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = process.argv.slice(2);

function askDefinitionFile(callback) {
  if (args.length) {
    return callback(null, _path2.default.resolve(process.cwd(), args[0]));
  }

  (0, _ask_swagger_file2.default)(__dirname, function (file) {
    callback(null, file);
  });
}

function askTargetDirectory(callback) {
  if (args.length > 1) {
    var dir = _path2.default.resolve(process.cwd(), args[1]);

    if (!(0, _helpers.isDir)(dir)) {
      _fsExtra2.default.mkdirsSync(dir);
    }

    return callback(null, dir);
  }

  (0, _ask_target_dir2.default)(__dirname, function (dir) {
    callback(null, dir);
  });
}

_async2.default.series([askDefinitionFile, askTargetDirectory], function (err, results) {
  if (err) throw err;

  generateProject(results[0], results[1]);
});

function generateProject(swagger_file, target_dir) {
  var swagger = _jsonfile2.default.readFileSync(swagger_file);

  console.log(_chalk2.default.cyan('Generating project for %s...'), swagger.info.title);

  _swaggerNodeCodegen2.default.generate({ swagger: swagger, target_dir: target_dir });

  console.log(_chalk2.default.green('Done! ✨'));
  console.log(_chalk2.default.yellow('You can check your shiny new API in ') + _chalk2.default.magenta(target_dir) + _chalk2.default.yellow('.'));
}