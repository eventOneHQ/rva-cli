const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');
const upath = require('upath');
const mime = require('mime-types');

const uploadFolder = (gconfig, rvaName) => {
  return new Promise((fulfill, reject) => {
    const bucketName = `${rvaName}.${gconfig.baseName}`;
    // configuration
    const config = {
      s3BucketName: bucketName,
      folderPath: gconfig.publicFolder
    };

    // initialize S3 client
    const s3 = new AWS.S3({signatureVersion: 'v4'});

    // resolve full folder path
    const publicFolderPath = path.join(process.cwd(), config.folderPath);

    recursive(publicFolderPath, (err, files) => {
      if (err) {
        return reject(err);
      }
      if (!files || files.length === 0) {
        console.log(`Public folder '${publicFolderPath}' is empty or does not exist.`);
        return process.exit(1);
      }

      let requests = 0;
      // for each file in the directory
      for (var i = 0; i < files.length; i++) {
        requests++;
        const filePath = files[i];

        // get the full path of the file
        const parsed = path.parse(filePath);
        let fileName;
        if (parsed.dir === publicFolderPath) {
          fileName = parsed.base;
        } else {
          var unixPublic = upath.normalize(publicFolderPath);
          var unixDir = upath.normalize(parsed.dir);

          const folderKey = unixDir.replace(unixPublic, '');
          const key = folderKey.replace('/', '');

          fileName = `${key}/${parsed.base}`;
        }

        // ignore if directory
        if (fs.lstatSync(filePath).isDirectory()) {
          continue;
        }

        // read file contents
        fs.readFile(filePath, (error, fileContent) => {
          // if unable to read file contents, throw exception
          if (error) {
            return reject(error);
          }
          const type = mime.lookup(filePath) || 'application/octet-stream';
          // upload file to S3
          s3.putObject({
            Bucket: config.s3BucketName,
            Key: fileName,
            Body: fileContent,
            ContentType: type
          }, res => {
            requests--;
            console.log(`Successfully uploaded '${fileName}'`);
            if (requests == 0) {
              fulfill('Upload complete!');
            }
          });

        });
      }
    });
  });
}

module.exports = uploadFolder;
