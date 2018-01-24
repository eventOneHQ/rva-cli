const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const putWebsite = (config, rvaName) => {
  return new Promise((fulfill, reject) => {
    const bucketName = `${rvaName}.${config.baseName}`;

    const params = {
      Bucket: bucketName,
      WebsiteConfiguration: {
        ErrorDocument: {
          Key: config.errorPage || 'error.html'
        },
        IndexDocument: {
          Suffix: config.indexPage || 'index.html'
        }
      }
    };
    s3.putBucketWebsite(params, (err, data) => {
      if (err) {
        return reject(err, err.stack); // an error occurred
      } else {
        fulfill('Website enabled!'); // successful response
      }
    });
  });
}

module.exports = putWebsite;
