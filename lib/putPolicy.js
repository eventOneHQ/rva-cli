const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const putPolicy = (config, rvaName) => {
  return new Promise((fulfill, reject) => {
    const bucketName = `${rvaName}.${config.baseName}`;

    const policy = `{"Version": "2012-10-17","Statement": [{"Sid": "AddPerm","Effect": "Allow","Principal": "*","Action": "s3:GetObject","Resource": "arn:aws:s3:::${bucketName}/*"}]}`;
    const params = {
      Bucket: bucketName,
      Policy: policy
    };
    s3.putBucketPolicy(params, (err, data) => {
      if (err) {
        // an error occurred
        return reject(err, err.stack);
      } else {
        // successful response
        fulfill('Policy set!');
      }
    });
  });
}

module.exports = putPolicy;
