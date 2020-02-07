#!/bin/bash

pushToServer() {
    sudo yarn run docs:build
    cd docs/.vuepress
    scp -r dist root@top.wsmpage.cn:/opt/blog
    cd -
}

pushToGithub() {
    git push origin master
}

pushToServer
pushToGithub 


