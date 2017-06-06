const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const clc = require('cli-color');

function createBucket(config, rvaName) {
    return new Promise(function (fulfill, reject) {
        if (config.baseName) {
            const bucketName = `${rvaName}-${config.baseName}`;
            s3.createBucket({
                Bucket: bucketName
            }, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    fulfill(bucketName);
                }
            });
        } else {
            console.log(clc.red('Please set the review apps base name in rva.json'));
        }
    });
}

module.exports = createBucket;
