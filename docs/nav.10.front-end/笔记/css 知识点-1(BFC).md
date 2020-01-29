---
title: css 知识点-1(BFC)
time:  2019-10-7
author: wsm
mail: 1030057982@qq.com
---

**前置知识**

* 普通流 (normal flow)
> 在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定

* 浮动 (float)
> 在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似

* 绝对定位 (absolute positioning)
> 在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定



**BFC**

* 文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC
* 是一个独立的渲染区域，只有Block-level box参与（在下面有解释）， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干

![enter description here](https://img.wsmpage.cn/learning/2019-10-7/1570434559929.png)


* 触发条件
	* 根元素，即HTML元素
	* float的值不为none
	* overflow的值不为visible
	* display的值为inline-block、table-cell、table-caption
	* position的值为absolute或fixed

* BFC布局规则
	* 内部的Box会在垂直方向，一个接一个地放置
	* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
		* 解决 将其外套一个 div 通过触发该 div 的 BFC 来解决


* 应用
	* 解决浮动元素脱离标准流

``` 
<div style="border: 1px solid #000;overflow: hidden">
    <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

	* BFC 可以阻止元素被浮动元素覆盖

``` 
<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #eee">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #eee;</div>
```
![enter description here](https://img.wsmpage.cn/learning/2019-10-7/1570436662128.png)

* 第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 overflow: hidden

![enter description here](https://img.wsmpage.cn/learning/2019-10-7/1570436705956.png)

* 这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)