#!/usr/bin/env node

const program = require('commander');
const clc = require('cli-color');
const fs = require('fs');
const pkg = require('../package.json');
const checkEnv = require('../lib/checkEnv');

function readModuleFile(path, callback) {
  try {
    var filename = require.resolve(path);
    fs.readFile(filename, 'utf8', callback);
  } catch (e) {
    callback(e);
  }
}

readModuleFile('../logo.txt', function (err, text) {
  console.log(text + '\n');
});
checkEnv();

program
  .version(pkg.version)
  .command('start [name]', 'start a S3 review app')
  .command('stop [name]', 'stop a S3 review app')
  .command('init [baseName]', 'initialize a project with S3 review apps')
  .command('publish [baseName]', 'initialize and upload a project with S3 review apps')
  .parse(process.argv);

