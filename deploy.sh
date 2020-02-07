#!/bin/bash
if [ ! $1 ]; then  
       $1='add docs'  
fi  

pushToServer() {
    sudo yarn run docs:build
    cd docs/.vuepress
    scp -r dist root@top.wsmpage.cn:/opt/blog
    cd -
}


pushToGithub() {
    git add *
    git commit -m $1
    git push origin master
}

pushToServer
pushToGithub $1

