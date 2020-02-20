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

## HTTP2
* 所有数据以二进制传输
* 同一个链接发送多个请求不再需要按顺序来
* 头信息压缩以及推送等提高效率的功能

