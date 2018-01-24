const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const clc = require('cli-color');

const createBucket = (config, rvaName) => {
    return new Promise((fulfill, reject) => {
        if (config.baseName) {
            const bucketName = `${rvaName}.${config.baseName}`;
            s3.createBucket({
                Bucket: bucketName
            }, (err, data) => {
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
