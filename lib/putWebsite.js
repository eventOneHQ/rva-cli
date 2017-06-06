const AWS = require('aws-sdk');
const s3 = new AWS.S3();

function putWebsite(config, rvaName) {
    return new Promise(function (fulfill, reject) {
        const bucketName = `${rvaName}.${config.baseName}`;

        const params = {
            Bucket: bucketName,
            WebsiteConfiguration: {
                ErrorDocument: {
                    Key: "error.html"
                },
                IndexDocument: {
                    Suffix: "index.html"
                }
            }
        };
        s3.putBucketWebsite(params, function (err, data) {
            if (err) reject(err, err.stack); // an error occurred
            else fulfill('Website enabled!'); // successful response
        });
    });
}

module.exports = putWebsite;
