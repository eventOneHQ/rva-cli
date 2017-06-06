#!/usr/bin/env node

const program = require('commander');
const clc = require('cli-color');
const AWS = require('aws-sdk');
const fs = require('fs');
const pkg = require('./package.json');
const createBucket = require('./lib/createBucket');
const deleteBucket = require('./lib/deleteBucket');
const putPolicy = require('./lib/putPolicy');
const putWebsite = require('./lib/putWebsite');
const checkEnv = require('./lib/checkEnv');


const configFile = 'rva.json';
const s3 = new AWS.S3();

function readModuleFile(path, callback) {
  try {
    var filename = require.resolve(path);
    fs.readFile(filename, 'utf8', callback);
  } catch (e) {
    callback(e);
  }
}

program
  .version(pkg.version)
  .option('-n, --name <name>', 'Name of the review app. ')
  .option('-d, --delete', 'Remove review app. ')
  .parse(process.argv);

checkEnv();

const nameType = typeof program.name === 'string';

if (fs.existsSync(configFile) && nameType) {
  readModuleFile('./logo.txt', function (err, text) {
    console.log(text + '\n');
  });
  fs.readFile(configFile, 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }

    const config = JSON.parse(data);
    if (program.delete) {
      // delete option was passed
      console.log('Removing review app.')
      deleteBucket(config, program.name)
        .then((res) => {
          console.log('Removed:', res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // delete option was NOT passed
      createBucket(config, program.name)
        .then((res) => {
          // create bucket success
          console.log(`${res} has been created!`);

          putPolicy(config, program.name)
            .then((res) => {
              // put policy success
              console.log(res);
              putWebsite(config, program.name)
                .then((res) => {
                  // put website success
                  console.log(res);

                  console.log(`Setup complete. Visit http://${program.name+'-'+config.baseName}.s3-website-us-east-1.amazonaws.com`)
                })
                .catch((err) => {
                  // catch put website
                  console.log(err);
                });
            })
            .catch((err) => {
              // catch put policy
              console.log(err);
            });
        })
        .catch((err) => {
          // catch create bucket
          console.log(err);
        });
    }
  });
} else {
  if (!fs.existsSync(configFile)) {
    console.log(clc.red(configFile, 'doesn\'t seem to exist. '));
  }
  if (!nameType) {
    console.log(clc.red('Please specify a review app name with --name.'));
  }
}
