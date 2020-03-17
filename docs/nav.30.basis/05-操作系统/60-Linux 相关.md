---
title: Linux 相关
time:  2019-12-1
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

## 目录结构
![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575159786553.png)

* /bin 可执行二进制文件
* /etc 系统配置文件
* /home 每个用户的主目录
* /usr 放置系统应用
	* /usr/local 存放管理员安装软件目录
* /proc 虚拟文件目录
	* 你甚至可以找到正在运行的各种进程
* /dev 设备文件目录
* /boot 系统引导使用的文件
* /lib 系统引导 系统启动时 用到的动态库文件    
![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575163248214.png)


[推荐链接](http://blog.sina.com.cn/s/blog_65a8ab5d0101f35l.html)


## Linux 文件类型

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575165629408.png)


## Linux 存储管理
* Buddy 内存管理算法 ( 努力让内存分配与相邻内存合并快速进行
	* 基于计算机处理二进制的优势具有极高的效率
	* 算法主要是为了解决内存外碎片问题 ( 内存外碎片 -> 内存内碎片 
	* 核心
		* 将申请内存大小向上取 2的幂  
		* 一片连续内存的 '伙伴(buddy)' 是相邻的另一片大小一样的连续内存

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575158967760.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575159010252.png)
![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575159029882.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575159053064.png)

## Linux 文件系统概览
* 常见文件系统
	* FAT ( File Allocation Table
		* 微软Dos/Win 早期使用文件系统
		* 使用一张表保存盘块信息
	* NTFS ( New Technology File System
		* win7/win8/win10 ( win/linux 均可识别
	* EXT2/3/4 ( Extented File System
		* 用于 Linux ( 将一个 ext 格式的 U 盘插入 win win 将无法识别 

* 常见分区方式
	* GPT
	* MBR 
![MBR](https://img.wsmpage.cn/learning/2019-12-1/1575173177997.png)
![GPT](https://img.wsmpage.cn/learning/2019-12-1/1575173162904.png)


>  分区是将一个物理盘分成若干个逻辑盘
	每个逻辑盘中必须具有一种文件系统
	分区就是将物理盘隔开，文件系统就是将隔开的盘格式成某种类型的文件存储格式

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173094471.png)


[推荐链接1](https://blog.csdn.net/YM_IlY/article/details/86687160)
[推荐链接2](https://zhuanlan.zhihu.com/p/26098509)



## Ext 文件系统
![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173322554.png)

* tips:
	* Boot Sector  启动扇区 安装开机管理程序
	* Block Gruop 块组 存储数据实际位置
	* Inode 存放文件的原信息

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173566739.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173636536.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173592702.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173704776.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173611617.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173673239.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575173546128.png)

> 表面上，用户通过文件名，打开文件。实际上，系统内部这个过程分成三步：首先，系统找到这个文件名对应的inode号码；其次，通过inode号码，获取inode信息；最后，根据inode信息，找到文件数据所在的block，读出数据

[推荐链接](https://www.ruanyifeng.com/blog/2011/12/inode.html)

## 常用命令


```
netstat -nalp | grep 8080

ps -ef | grep java // ps 显示当前进程状态
ps -aux | grep java

find /tmp/cg/testLinux -name "*.txt"

df -T // 查看挂载磁盘信息
 dumpe2fs /dev/vda1 | less // 查看指定设备 inode 信息
 stat xxx // 查看某个文件具体信息
```

![enter description here](https://img.wsmpage.cn/learning/2019-10-9/1570579978858.png)



![enter description here](https://img.wsmpage.cn/learning/2019-10-9/1570580003869.png)


![enter description here](https://img.wsmpage.cn/learning/2019-10-10/1570673446983.png)


![](https://img.wsmpage.cn/learning/2019-10-10/1570673461571.png)
