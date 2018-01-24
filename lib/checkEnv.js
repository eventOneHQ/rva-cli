const env = process.env;
const clc = require('cli-color');

const checkID = () => {
  if (env.AWS_ACCESS_KEY_ID) {
    return;
  } else {
    console.log(clc.red('Please set your AWS key ID in the AWS_ACCESS_KEY_ID environment variable.'));
    process.exit(1);
  }
}

const checkEnv = () => {
  if (env.AWS_SECRET_ACCESS_KEY) {
    checkID();
  } else {
    console.log(clc.red('Please set your AWS secret key in the AWS_SECRET_ACCESS_KEY environment variable.'));
    checkID();
    process.exit(1);
  }
}

module.exports = checkEnv;
