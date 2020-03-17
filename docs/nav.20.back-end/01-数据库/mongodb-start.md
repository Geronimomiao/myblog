---
title: mongodb-start
time:  2019-11-8
author: wsm
mail: 1030057982@qq.com
---

选择版本
****
直接 yum 安装是 2.6 的老版本
```
vim /etc/yum.repos.d/mongodb-org-4.0.repo
# 源文件的内容如下：
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc

yum install -y mongodb-org

# 直接去官网下安装包 安装
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz
mv  mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb 
# 配置环境变量
export PATH=<mongodb-install-directory>/bin:$PATH
```


```
mkdir -p /data/db/log
vim /etc/mongodb.conf

dbpath=/data/db
logpath=/data/db/log/mongodb.log
logappend=true
bind_ip=0.0.0.0
port=27017
fork=true
auth=true
```
[角色创建及权限控制](https://www.jianshu.com/p/62736bff7e2e)

```
# 关闭服务
ps -ef | grep mongo

kill -2 pid
kill -15 pid
```

****
ssh 链接自动断开
```
ssh -o ServerAliveInterval=30 root@192.168.1.1
```
[推荐链接](https://blog.csdn.net/hustcw98/article/details/79325878)