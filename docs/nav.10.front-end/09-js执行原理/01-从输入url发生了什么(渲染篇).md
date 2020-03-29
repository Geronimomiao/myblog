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

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020032812580971.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)

一些复杂的 3D 变换、页面滚动，或者使用 z-indexing 做 z 轴排序等，为了更加方便地实现这些效果，渲染引擎还需要为特定的节点生成专用的图层，并生成一棵对应的图层树（LayerTree）

浏览器的页面实际上被分成了很多图层，这些图层叠加后合成了最终的页面

并不是布局树的每个节点都包含一个图层，如果一个节点没有对应的层，那么这个节点就从属于父节点的图层

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200328130156152.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)

**生成图块和生成位图**

* 位图
  * 又称栅格图（英語：Raster graphics）或点阵图，是使用像素阵列(Pixel-array/Dot-matrix點陣)来表示的图像


首先会将图层分块 优先渲染视口范围中的图块 这样可以大大加速页面首屏渲染速度

> 因为后面图块数据要进入 GPU 内存，考虑到浏览器内存上传到 GPU 内存的操作比较慢，即使是绘制一部分图块，也可能会耗费大量时间。针对这个问题，Chrome 采用了一个策略: 在首次合成图块时只采用一个低分辨率的图片，这样首屏展示的时候只是展示出低分辨率的图片，这个时候继续进行合成操作，当正常的图块内容绘制完毕后，会将当前低分辨率的图块内容替换。这也是 Chrome 底层优化首屏加载速度的一个手段

渲染进程中专门维护了一个栅格化线程池，专门负责把图块转换为位图数据
然后合成线程会选择视口附近的图块，把它交给栅格化线程池生成位图
生成位图的过程实际上都会使用 GPU 进行加速，生成的位图最后发送给合成线程

## 显示器展示

* 显示器显示图像的原理
  * 无论是 PC 显示器还是手机屏幕，都有一个固定的刷新频率，一般是 60 HZ，即 60 帧，也就是一秒更新 60 张图片，一张图片停留的时间约为 16.7 ms。而每次更新的图片都来自显卡的前缓冲区。而显卡接收到浏览器进程传来的页面后，会合成相应的图像，并将图像保存到后缓冲区，然后系统自动将前缓冲区和后缓冲区对换位置，如此循环更新。
  * 当某个动画大量占用内存的时候，浏览器生成图像的时候会变慢，图像传送给显卡就会不及时，而显示器还是以不变的频率刷新，因此会出现卡顿，也就是明显的掉帧现象


栅格化操作完成后，合成线程会生成一个绘制命令，即"DrawQuad"，并发送给浏览器进程。

浏览器进程中的viz组件接收到这个命令，根据这个命令，把页面内容绘制到内存，也就是生成了页面，然后把这部分内存发送给显卡。


