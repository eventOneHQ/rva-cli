# RVA-CLI [![GitHub issues](https://img.shields.io/github/issues/Filiosoft/rva-cli.svg)](https://github.com/Filiosoft/rva-cli/issues) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Filiosoft/rva-cli/master/LICENSE) [![npm](https://img.shields.io/npm/v/@filiosoft/rva-cli.svg)](https://www.npmjs.com/package/@filiosoft/rva-cli) [![npm](https://img.shields.io/npm/dt/@filiosoft/rva-cli.svg)](https://www.npmjs.com/package/@filiosoft/rva-cli) [![Docker Pulls](https://img.shields.io/docker/pulls/filiosoft/rva-cli.svg)](https://hub.docker.com/r/filiosoft/rva-cli)

AWS S3 Review Apps Tools CLI

_Docs incomplete_

## Installation

To install RVA-CLI, run the following:

```
$ npm i -g @filiosoft/rva-cli
```

## Usage
```

  Usage: rva [options] [command]

  Example: rva start upgrade-to-angular-2


  Commands:

    start [name]  start a S3 review app
    stop [name]   stop a S3 review app
    init [baseName]  initialize a project with S3 review apps
    publish [baseName]  initialize and upload a project with S3 review apps
    help [cmd]    display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```
### Configuration
Before using RVA, you need to create a `rva.json` file in your root project folder and set two environment variables. You can do this by running the following.

```
$ rva init [your_base_review_app_name]
```

### Create Review App
To create an AWS S3 bucket for a static website review app on a git branch called `upgrade-to-angular-2`, run the following.

```
$ rva start upgrade-to-angular-2
```

That will create the S3 bucket, set the bucket policy, and enable static website hosting. You will then be able to browse to the following to view the review app:
[http://upgrade-to-angular-2.review.example.com.s3-website-us-east-1.amazonaws.com](http://upgrade-to-angular-2.review.example.com.s3-website-us-east-1.amazonaws.com)

### Publish Review App
To create an AWS S3 bucket for a static website review app on a git branch called `upgrade-to-angular-2` and then publish the `publicFolder`, run the following.

```
$ rva publish upgrade-to-angular-2
```

That will create the S3 bucket, set the bucket policy, enable static website hosting, and upload your `publicFolder`. You will then be able to browse to the following to view the review app:
[http://upgrade-to-angular-2.review.example.com.s3-website-us-east-1.amazonaws.com](http://upgrade-to-angular-2.review.example.com.s3-website-us-east-1.amazonaws.com)

### Delete Review App
To delete the S3 review app you created above, run the following.

```
$ rva stop upgrade-to-angular-2
```

This will delete app files in the bucket and the bucket itself.

### Example `.gitlab-ci.yml` With RVA-CLI
_Coming soon..._
