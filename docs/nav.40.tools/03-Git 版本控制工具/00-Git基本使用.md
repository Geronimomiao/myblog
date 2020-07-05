---
title: Git 使用技巧
---

## 简介

![enter description here](https://img.wsmpage.cn/learning/2019-9-30/1569805768299.png)

* Remote 远程仓库
* Repository 本地仓库
* Index/Stage 暂存区
* WorkSpace 工作区


## 常用命令

* git init 
* git add *
* git commit -m "新增目录结构"
* git remote add origin https://github.com/Geronimomiao/advance.git
* git clone https://github.com/xiebruce/PicUploader.git
* git pull --rebase origin master(将远程 仓库代码拉下来 并和本地代码合并)
* git push origin master(将本地 仓库代码推至远程分支)
* git log(查看不同的版本)
* git reset -hard ed234234 (版本回退)

## 第一次使用git

* git config --global user.name "Your Name"
* git config --global user.email "email@example.com"

## Github 免密推送

* 自己生成公钥私钥
  * 将公钥上传目标网站
  * Settings–>SSH keys中点击New SSH Keys

```shell
# 如果之前已经git clone了项目到本地，就在命令行切换到本地仓库目录执行以下命令
# 删除远程仓库地址
git remote rm origin 

# 添加远程仓库地址
# 其实就是把通过https访问远程的项目方式改成通过ssh访问，因为我们的密钥只能用于ssh通信
git remote add origin git@git服务器域名或IP:用户名/仓库名.git

# 如果还没有克隆项目下来，就执行以下命令
git clone git@192.168.1.200:wangms/wms_script.git

# 此时再push项目时就不需要填写用户名和密码了
git push origin master
```

## git 多人合作中的一些用法
```shell
# 切换分支
git checkout xxx

# 在原有分支的基础上 创建分支并切换
git checkout -b iss53
# 等同于2条语句
git branch iss53 # git 创建分支
git checkout iss53

# 删除分支
git branch -d iss53

# 提交要在项目根目录 否则有些修改追踪不到
git commit -m 'feat: xxxx'

# 取回远程主机某个分支的更新，再与本地的指定分支合并
git pull
git fetch + git merge # 拉取 合并

# git 允许手动建立追踪关系
git branch --set-upstream master origin/next
```