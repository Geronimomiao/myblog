---
title: Linux 杂记-1
time:  2019-12-1
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

## 各种言语默认安装包的搜索路径
****
**以C++为例**
* #include “headfile.h”优先在当前目录查找头文件
	* 先搜索当前目录
	* 然后搜索-I指定的目录
	* 再搜索gcc的环境变量CPLUS_INCLUDE_PATH（C程序使用的是C_INCLUDE_PATH）
	* 最后搜索gcc的内定目录
		* /usr/include
		* /usr/local/include
		* /usr/lib/gcc/x86_64-redhat-linux/4.1.1/include
* #include < headfile.h >从系统默认路径查找头文件
	* 先搜索-I指定的目录
	* 然后搜索gcc的环境变量CPLUS_INCLUDE_PATH
	* 最后搜索gcc的内定目录
		* /usr/include
		* /usr/local/include
		* /usr/lib/gcc/x86_64-redhat-linux/4.1.1/include

[推荐链接](https://blog.csdn.net/crylearner/article/details/17013187)