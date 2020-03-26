---
title: 输入url后发生了什么(渲染篇)
---

## 当你输入URL

* 域名解析
* TCP分包
* IP寻路
* 握手
* 滑动窗口传输
* 持久化连接
* 挥手

**此处详细内容见[网络篇](https://top.wsmpage.cn:8848/basis/%E7%BD%91%E7%BB%9C/%E8%BE%93%E5%85%A5url%E5%90%8E%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88(%E7%BD%91%E7%BB%9C%E7%AF%87).html)**

* 构建dom树与cssom
* 构建渲染树
* 回流-重绘-渲染

**本文主要讲渲染相关的内容**


## 构建DOM树

这是因为浏览器无法直接理解和使用 HTML，所以需要将 HTML 转换为浏览器能够理解的结构——DOM 树

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200326092448102.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)


## 样式计算（Recalculate Style）

* CSS 转换为浏览器能够理解的结构
  * 渲染引擎接收到 CSS 文本时，会执行一个转换操作，将 CSS 文本转换为浏览器可以理解的结构——styleSheets
  * document.styleSheets

* 转换样式表中的属性值，使其标准化
  * em rem red bold 之类的属性转换 

* 计算出 DOM 树中每个节点的具体样式
  * CSS 的继承规则和层叠规则 


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200326092951270.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)


![在这里插入图片描述](https://img-blog.csdnimg.cn/20200326093947833.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)


## 合成布局树

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200326095258373.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)

* 遍历 DOM 树中的所有可见节点，并把这些节点加到布局树中
* 而不可见的节点会被布局树忽略掉，如 head 标签下面的全部内容，再比如 body.p.span 这个元素，因为它的属性包含 dispaly:none，所以这个元素也没有被包进布局树


## 渲染过程

**建立图层树**





