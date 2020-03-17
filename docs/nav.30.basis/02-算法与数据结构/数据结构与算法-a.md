---
title: 数据结构与算法-1
time:  2019-10-6
author: wsm
mail: 1030057982@qq.com
---

**线性表**

* 数据排成像线一样的结构 每个线性表的数据最多只有前后两个方向

![enter description here](https://img.wsmpage.cn/learning/2019-10-6/1570371686774.png)

**非线性表**

* 数据之间并不是简单的前后关系

![enter description here](https://img.wsmpage.cn/learning/2019-10-6/1570372461273.png)


**数组**

* 定义
	* 一种线性表数据结构
	* 用一组连续的内存空间，来存储一组具有相同类型的数据

* 特性
	* 随机访问
	
```
a[i]_address = base_address + i * data_type_size
```

* 插入
	* 需要将一个数据插入到数组中的第 k 个位置。为了把第 k 个位置腾出来，给新来的数据，我们需要将第 k～n 这部分的元素都顺序地往后挪一位
	* 数组中存储的数据并没有任何规律，数组只是被当作一个存储数据的集合。在这种情况下，如果要将某个数组插入到第 k 个位置，为了避免大规模的数据搬移，我们还有一个简单的办法就是，直接将第 k 位的数据搬移到数组元素的最后，把新的元素直接放入第 k 个位置 

**链表**

* 定义
	* 一种线性表数据结构
	* 通过指针将零散的数据结构串联起来

* 单链表

![enter description here](https://img.wsmpage.cn/learning/2019-10-7/1570411899267.png)

![enter description here](https://img.wsmpage.cn/learning/2019-10-7/1570411953046.png)



* 循环链表
	* 循环链表的尾结点指针是指向链表的头结点

![enter description here](https://img.wsmpage.cn/learning/2019-10-7/1570412286657.png)

* 双向链表
	* 它支持两个方向，每个结点不止有一个后继指针 next 指向后面的结点，还有一个前驱指针 prev 指向前面的结点

![enter description here](https://img.wsmpage.cn/learning/2019-10-7/1570412472527.png)

**栈**
* 定义
	* 后进者先出，先进者后出

![enter description here](https://img.wsmpage.cn/learning/2019-10-10/1570675464552.png)


* 实现
	* 用数组实现的栈，我们叫作顺序栈
	* 用链表实现的栈，我们叫作链式栈 


