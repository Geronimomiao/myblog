---
title: js 知识点-1(事件冒泡 捕获)(判断PC 移动端)
time:  2019-10-12
author: wsm
mail: 1030057982@qq.com
---

**JS 事件流**
* 事件捕获
	* 鼠标点击或者触发dom事件时，浏览器会从根节点开始由外到内进行事件传播，即点击了子元素，如果父元素通过事件捕获方式注册了对应的事件的话，会先触发父元素绑定的事件 
* 处于目标状态
* 事件冒泡
	* 与事件捕获恰恰相反，事件冒泡顺序是由内到外进行事件传播，直到根节点

* dom标准事件流的触发的先后顺序为：先捕获再冒泡
	* addEventListener(event, listener, useCapture)　
		* useCapture---是否采用事件捕获进行事件捕捉，默认为false，即采用事件冒泡方式
		
* 阻止事件冒泡
	* e.stopPropagation(); 		



**JS 判断是否为移动端**
``` javascript
function isMobile(){
	if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
	)return true;
	return false;
}
```