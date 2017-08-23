FROM node:8
MAINTAINER Filiosoft, LLC <opensource@filiosoft.com>

RUN apt-get -qq update && \
    apt-get -y --no-install-recommends install rsync python python-pip python-dev python-setuptools ca-certificates groff build-essential && \
    pip install awscli && \
    apt-get -y autoremove && \
    apt-get -y autoclean && \
    rm -rf /var/lib/apt/lists/* 

RUN yarn global add @filiosoft/rva-cli
