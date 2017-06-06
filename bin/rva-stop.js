#!/usr/bin/env node

const clc = require('cli-color');
const program = require('commander');
const fs = require('fs');
const deleteBucket = require('../lib/deleteBucket');

const configFile = 'rva.json';

program
  .parse(process.argv);
const appName = program.args[0];
const nameType = typeof appName === 'string';

if (fs.existsSync(configFile) && nameType) {
  fs.readFile(configFile, 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }

    const config = JSON.parse(data);

    console.log(`Stoping review app...`)
    deleteBucket(config, appName)
      .then((res) => {
        console.log(`Review app ${res} stopped.`);
      })
      .catch((err) => {
        console.log(err);
      });

  });
} else {
  if (!fs.existsSync(configFile)) {
    console.log(clc.red(`${configFile} doesn't seem to exist in your working directory.`));
  }
  if (!nameType) {
    console.log(clc.red('Please specify a review app name.'));
  }
}
