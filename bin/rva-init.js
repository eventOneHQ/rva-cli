#!/usr/bin/env node

const clc = require('cli-color');
const program = require('commander');
const fs = require('fs');
const prompt = require('prompt');
const PromptConfirm = require('prompt-confirm');
const path = require('path');

const configFile = path.resolve('rva.json');

let obj = {};

program
  .parse(process.argv);
const baseName = program.args[0];
const nameType = typeof baseName === 'string';

console.log('Initializing project with S3 review apps...');

function writeDoc(input) {
  const json = JSON.stringify(input);
  fs.writeFile(configFile, json, 'utf8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(clc.yellow('\nPlease set the following environment variable: '));
    console.log('AWS_SECRET_ACCESS_KEY');
    console.log('AWS_ACCESS_KEY_ID');
    console.log(clc.green('\nS3 review apps initialized!'));

  });
}

function writeJson(input) {
  const configFile = path.resolve('rva.json');
  if (fs.existsSync(configFile)) {
    console.log(clc.yellow('rva.json already exists in the current working directory. Overwrite?'));

    const confirm = new PromptConfirm('Overwrite rva.json?');
    confirm.ask(function (yes) {
      if (yes) {
        writeDoc(input);
      } else {
        console.log(clc.red('Initialization cancelled...'));
      }
    });
  } else {
    writeDoc(input);
  }
}

if (nameType) {
  console.log(`Setting base name to ${baseName}`);
  obj.baseName = baseName;
  writeJson(obj);
} else {
  prompt.start();
  const schema = {
    properties: {
      baseName: {
        description: 'Base review app bucket name',
        pattern: /^(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/i,
        message: 'Base name must be a valid FQDN.',
        required: true
      },
      publicFolder: {
        description: 'Public folder to upload to S3',
        required: true,
        default: 'public',
      },
      indexPage: {
        description: 'Static website index document',
        required: false,
        default: 'index.html',
      },
      errorPage: {
        description: 'Static website error document',
        required: false,
        default: 'error.html',
      }
    }
  };
  prompt.get(schema, function (err, result) {
    obj.baseName = result.baseName;
    writeJson(obj);
  });
}
