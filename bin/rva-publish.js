#!/usr/bin/env node

const clc = require('cli-color');
const program = require('commander');
const fs = require('fs');
const createBucket = require('../lib/createBucket');
const putPolicy = require('../lib/putPolicy');
const putWebsite = require('../lib/putWebsite');
const uploadFolder = require('../lib/uploadFolder');
const path = require('path');
const checkEnv = require('../lib/checkEnv');

const configFile = path.resolve('rva.json');
checkEnv();

program.parse(process.argv);
const appName = program.args[0];
const nameType = typeof appName === 'string';

if (fs.existsSync(configFile) && nameType) {
  fs.readFile(configFile, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }

    const config = JSON.parse(data);

    createBucket(config, appName).then(app => {
      // create bucket success
      console.log(`${app} has been started!`);

      putPolicy(config, appName).then(polRes => {
        // put policy success
        console.log(polRes);
        putWebsite(config, appName).then(webRes => {
          // put website success
          console.log(webRes);

          uploadFolder(config, appName).then(upRes => {
            // upload website success
            console.log(upRes);

            console.log(clc.green(`\nReview app uploaded! Visit http://${appName}.${config.baseName}.s3-website-us-east-1.amazonaws.com`));
          }).catch(err => {
            // catch upload website
            console.log(err);
          });
        }).catch(err => {
          // catch put website
          console.log(err);
        });
      }).catch(err => {
        // catch put policy
        console.log(err);
      });
    }).catch(err => {
      // catch create bucket
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
