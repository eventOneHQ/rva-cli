const AWS = require('aws-sdk');
const s3 = new AWS.S3();

function putPolicy(config, rvaName) {
    return new Promise(function (fulfill, reject) {
        const bucketName = `${rvaName}-${config.baseName}`;

        const policy = `{"Version": "2012-10-17","Statement": [{"Sid": "AddPerm","Effect": "Allow","Principal": "*","Action": "s3:GetObject","Resource": "arn:aws:s3:::${bucketName}/*"}]}`
        const params = {
            Bucket: bucketName,
            Policy: policy
        };
        s3.putBucketPolicy(params, function (err, data) {
            if (err) reject(err, err.stack); // an error occurred
            else fulfill('Policy set!'); // successful response
        });
    });
}

module.exports = putPolicy;
