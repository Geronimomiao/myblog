---
title: http 发展史
---

## HTTP/0.9
* 只有GET命令
* 没有HEADER等描述数据的信息
* 服务器发送完毕 关闭TCP链接
  * TCP链接 和 HTTP请求并非一一对应关系

## HTTP/1.0
* 增加很多命令
* 增加 status code 和 header
* 多字符集支持 多部分发送 权限 缓存等

## HTTP/1.1
* 持久链接
* pipeline
* 增加host和其他一些命令

## SPDY(HTTP/2 前身)
2012年 google 如一声惊雷提出了 SPDY 的方案，大家才开始从正面看待和解决老版本 HTTP 协议本身的问题，SPDY 可以说是综合了 HTTPS 和 HTTP 两者优点于一体并有所改进的传输协议。

HTTP2 可以说是 SPDY 的升级版（其实原本也是基于 SPDY 设计的），但是，HTTP2.0 跟 SPDY 仍有不同的地方，主要是以下两点：

* HTTP2 支持明文 HTTP 传输，而 SPDY 强制使用 TLS 加密层
* HTTP2 消息头的压缩算法采用 HPACK，而非 SPDY 采用的 DEFLATE


## HTTP/2
* 所有数据以二进制传输
* 同一个链接发送多个请求不再需要按顺序来
* 头信息压缩以及推送等提高效率的功能

## HTTP/3(QUIC) 
是即将到来的第三个主要版本的HTTP协议，使用于万维网。在HTTP/3中，将弃用TCP协议，改为使用基于UDP协议的QUIC协议实现。QUIC（快速UDP网络连接）是一种实验性的传输层网络传输协议，由Google开发，该协议旨在取代TCP协议，使网页传输更快


[传送门](https://kingsunday.github.io/2018/10/11/from-http-to-http2/)