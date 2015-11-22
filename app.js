import path from 'path';
import async from 'async';
import generator from 'swagger-node-codegen';
import askSwaggerFile from './lib/ask_swagger_file.js';
import askTargetDir from './lib/ask_target_dir.js';
import chalk from 'chalk';

const args = process.argv.slice(2);

function askDefinitionFile (callback) {
  if (args.length) {
    return callback(null, path.resolve(__dirname, args[0]));
  }

  askSwaggerFile(__dirname, (file) => {
    callback(null, file);
  });
}

function askTargetDirectory (callback) {
  if (args.length > 1) {
    return callback(null, path.resolve(args[1]));
  }

  askTargetDir(__dirname, (dir) => {
    callback(null, dir);
  });
}

async.series([
  askDefinitionFile,
  askTargetDirectory
], (err, results) => {
  if (err) throw err;

  generateProject(results[0], results[1]);
});

function generateProject (swagger_file, target_dir) {
  const swagger = require(swagger_file);

  console.log(chalk.cyan('Generating project for %s...'), swagger.info.title);

  generator.generate({ swagger, target_dir });

  console.log(chalk.green('Done! ✨'));
  console.log(chalk.yellow('You can check your shiny new API in ') + chalk.magenta(target_dir) + chalk.yellow('.'));
}