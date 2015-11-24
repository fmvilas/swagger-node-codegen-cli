import xfs from 'fs-extra';
import path from 'path';
import async from 'async';
import generator from 'swagger-node-codegen';
import askSwaggerFile from './lib/ask_swagger_file.js';
import askTargetDir from './lib/ask_target_dir.js';
import { isDir } from './lib/helpers.js';
import chalk from 'chalk';

const args = process.argv.slice(2);

function askDefinitionFile (callback) {
  if (args.length) {
    return callback(null, path.resolve(process.cwd(), args[0]));
  }

  askSwaggerFile(process.cwd(), (file) => {
    callback(null, file);
  });
}

function askTargetDirectory (callback) {
  if (args.length > 1) {
    const dir = path.resolve(process.cwd(), args[1]);

    if (!isDir(dir)) {
      xfs.mkdirsSync(dir);
    }

    return callback(null, dir);
  }

  askTargetDir(process.cwd(), (dir) => {
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
  console.log(chalk.cyan('Generating project...'));

  generator.generate({ swagger: swagger_file, target_dir }, (err) => {
    if (err) {
      console.log(chalk.red('Aaww 💩. Something went wrong:'));
      console.log(chalk.red(err.message));
      return;
    }

    console.log(chalk.green('Done! ✨'));
    console.log(chalk.yellow('You can check your shiny new API in ') + chalk.magenta(target_dir) + chalk.yellow('.'));
  });
}
