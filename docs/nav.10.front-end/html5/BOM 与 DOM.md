---
title: BOM 与 DOM
---

### BOM
* 浏览器对象模型 
  * 提供很多对象 用于访问浏览器的功能 

**Window 对象**
既是通过 JS 访问浏览器窗口的一个接口
又是一个 Global 对象
在全局作用域变量 函数都会变成 window 对象的属性 方法

**Location 对象**
* hash ( #xxx
* host ( 域名+端口号
* hostname ( 域名
* pathname ( /xxx
* port 
* protocol ( http https
* search ( ?xxx
* replace(url)

**navigator 对象**
* userAgent ( 可根据此 检测用户平台 (浏览器版本 PC/移动)
* Platform
* geolocation

**history 对象**
```js
history.go(-1)  // 后退一页
history.go(2)   //  前进两页

history.back()  // 后退一页
history.forward()  // 前进一页

history.length  //  历史记录数量
```

### DOM
* 文档对象模型
  * 针对 HTML 和 XML 文档的一个 API
  * 允许开发人员 添加 移除 修改 页面的一部分 


**Node 类型**
JS 中所有节点都继承 Node 类型
每一个节点都有一个 nodeType 类型( 可以通过比较节点 nodeType 确定节点的类型
每个节点都有一个 childNodes 属性 保存一个 NodeList 对象(类数组对象 保存一组有序节点 是基于DOM的动态查询结果)
* 列举一些节点属性(访问不同节点)
  * parentNode
  * nextSibling
  * previousSibling
  * firstChild
  * lastChild 
* 列举一些节点属性(操作节点)
  * appendChild()   // 插入/转移 节点于最后一个子节点
  * insertBefore(newNode,  someNode.lastChild)
  * replaceChild(newNode,  someNode.lastChild)
  * removeChild(someNode.lastChild)
  * cloneNode(true/false)

