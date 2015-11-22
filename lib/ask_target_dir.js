import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import clear from 'clear';
import { isDir } from './helpers.js';

export default function askTargetDir (dir, callback) {
  clear();

  const questions = [
    {
      type: 'list',
      name: 'target_path',
      message: 'Where do you want to place your project?'
    }
  ];
  questions[0].choices = ['.', '..'].concat(fs.readdirSync(dir)).filter((file) => {
    return fs.statSync(path.resolve(dir, file)).isDirectory();
  });

  inquirer.prompt(questions, (answers) => {
    const chosen = path.resolve(dir, answers.target_path);

    if (answers.target_path !== '.' && isDir(chosen)) {
      return askTargetDir(chosen, callback);
    }

    callback(chosen);
  });
}
