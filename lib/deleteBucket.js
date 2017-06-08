const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const clc = require('cli-color');

function deleteSingleObject(key, bucket) {
  return new Promise((fulfill, reject) => {
    var params = {
      Bucket: bucket,
      Key: key
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        // an error occurr
        console.log(err);
        reject(err);
      }
      fulfill(data);
    });

  });
}

function deleteObjects(bucket) {
  return new Promise((fulfill, reject) => {
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
        let inserted = 0;
        for (let i = 0; i < length; i++) {
          const key = data.Contents[i].Key;
          const len = length - 1;

          deleteSingleObject(key, bucket).then((data) => {
            if (++inserted === length) {
              fulfill('Done');
            }
          }).catch((err) => {
            console.error(err);
          });
        }
      }
    });
  });
}

function deleteBucket(config, rvaName) {
  return new Promise((fulfill, reject) => {
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
