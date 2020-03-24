---
title: 输入url后发生了什么(网络篇)
---

## 先放图为敬

![](https://img-blog.csdnimg.cn/20200212184403315.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)


[参考文章](https://segmentfault.com/a/1190000006743262)


## 从双击打开谈起

**Chrome**

当你打开浏览器浏览一些页面 会开启如下进程

![enter description here](https://img.wsmpage.cn/learning/2019-9-29/1569738666767.png)

**Chrome 架构**

![enter description here](https://img.wsmpage.cn/learning/2019-9-29/1569739489462.png)

* 浏览器进程。
	* 主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。
* 渲染进程
	* 核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在沙箱模式下。
* GPU 进程
	* 其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。
* 网络进程
	* 主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。
* 插件进程
	* 主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。


## 当你输入URL

* 域名解析
* TCP分包
* IP寻路
* 握手
* 滑动窗口传输
* 持久化连接
* 挥手

**本文主要讲网络相关的内容**

* 解析
* 构建dom树与cssom
* 构建渲染树
* 回流-重绘-渲染

**此处详细内容见渲染篇**


## DNS 域名解析

![DNS](https://img.wsmpage.cn/learning/2019-9-29/1569747459226.png)	
![DNS](https://img.wsmpage.cn/learning/2019-9-29/1569747477182.png)

* 本机 hosts -> DNS 
* 若未查到  则查询本地 DNS 服务器
* 还未查到  则查询根 域名服务器
	*  顶级
	* 返回权威 DNS 服务器地址 



## TCP分包
* MSS
	* TCP数据包每次能够传输的最大数据分段，TCP报文段的长度大于MSS时，要进行分段传输 
	* 如果不设置，则MSS的默认值就为536个字节
	* TCP报文段的分段与重组是在运输层完成的
 
## IP寻路

* 通过路由器 交换机 从一个局域网 跳到 另一个局域网 
	
	
## 三次握手


![enter description here](https://img.wsmpage.cn/learning/2019-9-30/1569806945328.png)

* 客户端向服务器发送请求报文  报文首部 SYN=1 同时选择初始序列号 seq = x 客户端进入同步已发送状态(SYN-SENT)
* 服务端收到 SYN 客户端的SYN包 同意链接 则发出确认报文 ACK=1 SYN=1 确认号 ack = x + 1  初始化自己的序列号 y 此时服务端进入同步收到状态(SYN-RCVD)
* 客户端收到 服务端的 SYN+ACK 包 向服务端 发送 报文 ACK=1 序列号(seq=x+1) 确认号(ack=y+1) 此时，TCP 连接建立，客户端进入 ESTABLISHED （已建立连接）状态


## 滑动窗口传输

![发送端](https://img.wsmpage.cn/learning/2019-10-14/1571057224048.png)

![接收端](https://img.wsmpage.cn/learning/2019-10-14/1571057263700.png)

* 让发送的每一个包都有一个id，接收端必须对每一个包进行确认，这样设备A一次多发送几个片段，而不必等候ACK，同时接收端也要告知它能够收多少，这样发送端发起来也有个限制

* 发送端
	* Sent and Acknowledged 
	* Send But Not Yet Acknowledged
	* Not Sent Recipient Ready to Receive
	* Not Sent Recipient Not Ready to Receive  
* 接受端(接收端的数据有3个分类，因为接收端并不需要等待ACK所以它没有类似的接收并确认了的分类)
	* Received and ACK Not Send to Process(接收了数据但是还没有被上层的应用程序接收，也是被缓存在窗口内)
	* Received  Not ACK
	* Not Received(有空位)
* 原理
	* TCP并不是每一个报文段都会回复ACK的，可能会对两个报文段发送一个ACK，也可能会对多个报文段发送1个ACK  
	

## 持久化链接

* 使用同一个TCP连接来发送和接收多个HTTP请求/应答，而不是为每一个新的请求/应答打开新的连接的方法
* 在 HTTP 1.1 中 所有的连接默认都是持续连接，除非特殊声明不支持。[1] HTTP 持久连接不使用独立的 keepalive 信息，而是仅仅允许多个请求使用单个连接 
* 服务器 收到 TCP 数据包 组包由传输层 完成(对应用程序而言 不用关注通信细节)
* 一旦组装好 TCP 数据包 就把他们交给应用程序 TCP 协议有个参数端口 就是用来指定转交给监听端口对应用程序
* 应用程序收到组装好的原始数据，以浏览器为例，就会根据 HTTP 协议的Content-Length字段正确读出一段段的数据。这也意味着，一次 TCP 通信可以包括多个 HTTP 通信 



![enter description here](https://img.wsmpage.cn/learning/2019-9-30/1569812910497.png)


## 四次挥手

* 前两次表示客户端停止发消息 后两次表示服务端停止发消息 
* 由客户端发起 首部报文 FIN, ACK 为 1 其序列号为 seq = u（等于前面已经传送过来的数据的最后一个字节的序号加1）此时 客户端 进入 终止状态1 
* 服务端收到消息 确认报文 ACK = 1 ack = u + 1  及自己的序列号 seq = v 进入 CLOSE-WAIT(等待关闭状态)
	* TCP 服务器通知高层的应用进程，客户端向服务器的方向就释放了，这时候处于半关闭状态，即客户端已经没有数据要发送了，但是服务器若发送数据，客户端依然要接受。这个状态还要持续一段时间，也就是整个 CLOSE-WAIT 状态持续的时间。
	* 客户端收到服务器的确认请求后，此时，客户端就进入 FIN-WAIT-2（终止等待2）状态，等待服务器发送连接释放报文（在这之前还需要接受服务器发送的最后的数据）
* 由服务端发起 释放链接的报文 FIN, ACK 为 1  ack = u+1 其序列号为 seq = w(在半关闭状态 服务端可能又发送一些数据) 
* 客户端收到 并回复 确认报文 ACK = 1, seq=u+1, ack=w+1 此时客户端进入 TIME-WAIT(时间等待状态)
    * 服务端收到后 会立即进入 CLOSE 状态
	* 客户端会必须经过 2MSL（最长报文段寿命）的时间后 才进入 CLOSED 状态    



## 回流/重排 (Reflow)

* 当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流
* 引起Reflow方法
	* 页面首次渲染
	* 浏览器窗口大小发生改变
	* 元素尺寸或位置发生改变
   	* 元素内容变化（文字数量或图片大小等等）
	* 元素字体大小变化
	* 添加或者删除可见的DOM元素
	* 激活CSS伪类（例如：:hover）
	* 设置style属性
	* 查询某些属性或调用某些方法



#### 重绘 (Repaint)
	* 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘   
	
