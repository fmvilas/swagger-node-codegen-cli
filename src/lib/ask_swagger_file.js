import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';
import clear from 'clear';
import { isDir } from './helpers.js';

export default function askDefinitionFile (dir, callback) {
  clear();

  const questions = [
    {
      type: 'list',
      name: 'swagger_path',
      message: 'Where is the swagger definition file?'
    }
  ];
  questions[0].choices = ['..'].concat(fs.readdirSync(dir));

  inquirer.prompt(questions, (answers) => {
    const chosen = path.resolve(dir, answers.swagger_path);

    if (isDir(chosen)) {
      return askDefinitionFile(chosen, callback);
    }

    callback(chosen);
  });
}
