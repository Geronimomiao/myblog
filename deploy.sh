#!/bin/bash



sudo yarn run docs:build
cd docs/.vuepress
scp -r dist root@top.wsmpage.cn:/opt/blog
cd -

git add *
git commit -m 'add docs'
git push origin master

