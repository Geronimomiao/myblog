---
title: 操作系统入门-3
time:  2019-11-30
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

## 前置知识
****
**死锁**
> 死锁是指两个或两个以上的线程在执行过程中，由于竞争资源或者由于彼此通信而造成的一种阻塞的现象，若无外力作用，它们都将无法推进下去。 此时称系统处于死锁状态或系统产生了死锁，这些永远在互相等待的进程称为死锁进程

* 必要条件
	* 互斥条件
		* 对资源 排他性 ( 某资源只能由一个进程使用 其他进程只能等待 
	* 请求保持条件
		* 进程至少保存一个资源 又提出新的资源请求
		* 新资源被占用 请求被阻塞 
		* 被阻塞进程不释放自己所保存资源
	* 不可剥夺条件
		* 进程获得资源在未完成使用前不能被剥夺
		* 获得资源只能由自身释放
	* 环路等待条件 
		* 发生死锁 必然存在进程-资源 环形链

* 破局 ( 破坏必要条件中 一个或多个
	* 系统规定进程运行前 一次性申请所有需要的资源 
	* 当一个进程请求新的资源得不到满足 必须释放占有的资源
	* 可用资源线性排序 申请必须按照递增申请

* 银行家算法
![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575119657564.png)  

![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575119682476.png)

**字块 相对于物理设备的定义**
**页面 相对于逻辑空间的定义**

**页内碎片 ( 内部碎片)**
* 当已经被分配出的内存空间 大于 进程所需要的内存空间 所不能被利用的部分
**页外碎片**
* 未被分配出去 但由于大小而无法分配给申请空间的新进程的内存空闲块

## 存储管理
****
* 内存分配与回收

![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575122698583.png)

![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575123653574.png)

![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575124180097.png)


**字块 相对于物理设备的定义**
**页面 相对于逻辑空间的定义**
* 页式存储管理 ( 有效提高内存利用率 虽然说存在内存碎片
	* 将进程逻辑空间等分成若干大小的页面
	* 相应的把物理内存空间分成与页面大小的物理块
	* 以页面为单位吧进程空间装进物理内存中分散的物理块 	

![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575128768895.png)


* 段式存储管理 ( 更好满足用户需求
	* 将进程逻辑空间分成若干大小的页面 ( 非等分
	* 段的长度由连续逻辑长度决定

![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575128731293.png)


* 段页式存储管理
	* 先将逻辑空间按段式管理分成若干段
	* 再把段内空间按页式管理分成若干页

![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575128704580.png)

![enter description here](https://img.wsmpage.cn/learning/2019-11-30/1575128678141.png)	  

**虚拟内存**
* 由来
	* 有些进程实际需要的内存很大 远超物理内存容量
	* 多道程序设计 使得每个内存可用的物理内存更加稀缺
	* 不可能无限增加物理内存 物理内存总有不够的时候

* 概述
	* 把程序使用内存划分 将暂时不用的内存放置在辅存 ( 硬盘
	
* 程序局部性原理
	* CPU 访问存储器时 无论是存取指令还是存取数据 所访问的存储单元都趋于聚集在一个较小时连续区域中
	* 程序运行时 无需全部装入内存 装载部分即可
	* 如果访问页不在内存 则发出缺页中断 发起页面置换
	* 从用户层面看 程序拥有很大的空间  	
	
* 虚拟内存置换算法
	* 先进先出算法 ( FIFO
	* 最不经常使用算法 ( LFU
	* 最近最少使用算法 ( LRU

> 替换策略发生在 Cache-主存   主存-辅存
> 前者解决速度问题 后者解决容量问题



**Linux 存储管理**
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


## 操作系统设备管理
****
* 广义的 IO 设备
	* 对 CPU  而言 凡是对 CPU 进行设备输入对都是输入设备
	* 对 CPU  而言 凡是对 CPU 进行设备输出对都是输出设备

* IO 设备缓冲区
	* 减少 CPU 处理 IO 请求对频率
	* 提高 CPU 与 IO 设备之间的并行性

* IO 设备的分类
![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575192766056.png)  

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575192785141.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575192799191.png)

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575192820753.png)


**IO设备缓冲区**

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575192840947.png)

* 专用缓冲区只适用于特定进程 ( 当这样 IO 进程比较多 对内存消耗也很大
* 操作系统划出可供多个进程使用的公共缓冲区 ( 称之为缓冲池

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575193784135.png)


**SPOOLing 技术**
* 关于慢速字符设备如何与计算机主机交换信息的一种技术
* 利用高速共享设备将低速的独享设备模拟成高速的共享设备
* 逻辑上 系统为每个用户都分配了一台独立高速共享设备

![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575193802893.png)
![enter description here](https://img.wsmpage.cn/learning/2019-12-1/1575193824610.png)
