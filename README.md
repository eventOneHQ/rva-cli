# RVA-CLI [![GitHub issues](https://img.shields.io/github/issues/Filiosoft/rva-cli.svg)](https://github.com/Filiosoft/rva-cli/issues) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Filiosoft/rva-cli/master/LICENSE) [![npm](https://img.shields.io/npm/v/@filiosoft/rva-cli.svg)](https://www.npmjs.com/package/@filiosoft/rva-cli) [![npm](https://img.shields.io/npm/dt/@filiosoft/rva-cli.svg)](https://www.npmjs.com/package/@filiosoft/rva-cli) [![Docker Pulls](https://img.shields.io/docker/pulls/filiosoft/rva-cli.svg)](https://hub.docker.com/r/filiosoft/rva-cli) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/e9965678265a4278982594d165af3c40)](https://www.codacy.com/app/nprail/rva-cli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Filiosoft/rva-cli&amp;utm_campaign=Badge_Grade)

AWS S3 [Review Apps](https://docs.gitlab.com/ee/ci/review_apps/index.html) Tools CLI

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

### Publish Review App
To create an AWS S3 bucket for a static website review app on a git branch called `upgrade-to-angular-2` and then publish the `publicFolder`, run the following.

```
$ rva publish upgrade-to-angular-2
```

This will do the following steps:

1. Run `rva start` (see [below](#start-review-app) for what it does)
2. Upload your `publicFolder`

You will then be able to browse to the following to view the review app:
[http://upgrade-to-angular-2.review.example.com.s3-website-us-east-1.amazonaws.com](http://upgrade-to-angular-2.review.example.com.s3-website-us-east-1.amazonaws.com)

### Start Review App
_If you are using `rva publish` you do not need to start the review app_

To create an AWS S3 bucket for a static website review app on a git branch called `upgrade-to-angular-2`, run the following.

```
$ rva start upgrade-to-angular-2
```
This will do the following steps:

1. Create an S3 bucket
2. Set the bucket policy
3. Enable static website hosting in the bucket

You will then be able to upload your website to the bucket!

### Delete Review App
To delete the S3 review app you created above, run the following.

```
$ rva stop upgrade-to-angular-2
```

This will delete app files in the bucket and the bucket itself.

### Example `.gitlab-ci.yml` With RVA-CLI

```yaml
stages:
  - build
  - deploy

variables:
  BASE_DOMAIN: "review.example.com" # Should be the same as the configured base domain

build:
  stage: build
  tags: 
  - docker
  image: node:8
  script:
  - npm build
  artifacts:
    paths:
    - public

start_review:
  stage: deploy
  tags: 
  - docker
  image: filiosoft/rva-cli:latest
  dependencies:
  - build
  script:
  - rva publish ${CI_ENVIRONMENT_SLUG}
  environment:
    name: review/${CI_BUILD_REF_NAME}
    url: http://${CI_ENVIRONMENT_SLUG}.${BASE_DOMAIN}
  artifacts:
    paths:
    - public

stop_review:
  stage: deploy
  tags: 
  - docker
  image: filiosoft/rva-cli:latest
  script:
    - rva stop ${CI_ENVIRONMENT_SLUG}
  when: manual
  environment:
    name: review/${CI_BUILD_REF_NAME}
    action: stop
```