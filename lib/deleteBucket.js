const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const clc = require('cli-color');

function deleteObjects(bucket) {
  return new Promise(function (fulfill, reject) {
    s3.listObjects({
      Bucket: bucket
    }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        length = data.Contents.length;
        if (length < 1) {
          fulfill('Done');
        }

        function deleteCallback(err, data) {
          if (err) {
            // an error occurr
            console.log(err, err.stack);
          }
          if (i === length) {
            fulfill('Done');
          }
        }

        for (var i = 0, len = length; i < len; i++) {
          var params = {
            Bucket: bucket,
            Key: data.Contents[i].Key
          };
          s3.deleteObject(params, deleteCallback);
        }

      }
    });
  });
}

function deleteBucket(config, rvaName) {
  return new Promise(function (fulfill, reject) {
    if (config.baseName) {
      const bucketName = `${rvaName}.${config.baseName}`;
      deleteObjects(bucketName)
        .then((res) => {
          s3.deleteBucket({
            Bucket: bucketName
          }, function (err, data) {
            if (err) {
              reject(err);
            } else {
              fulfill(bucketName);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(clc.red('Please set the review apps base name in rva.json'));
    }
  });
}

module.exports = deleteBucket;
