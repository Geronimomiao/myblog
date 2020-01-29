---
title: Websocket
time:  2019-10-16
author: wsm
mail: 1030057982@qq.com
---


==web 实时通信==
```
var socket = new WebSocket("ws://10.2.200.140:8080");
socket.onopen = function(){
    socket.send("长江长江，我是黄河");
}
socket.onmessage = function(event){
    document.write("收到来自黄河的消息：" + event.data);
}
```

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571229493544.png)

* 链接建立

* 首先还是要先建立tcp连接，完成后客户端发送一个upgrade的http请求 

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571229551091.png)

* 服务器同意 返回Switching Protocols，连接建立

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571229591629.png)

****

* 数据帧

![enter description here](https://img.wsmpage.cn/learning/2019-10-18/1571409124538.png)

* FIN  
	* 1 表示数据最后一个分片 0 表示不是数据最后一个分片
* RSV1, RSV2, RSV3
	* 一般情况下全为0。当客户端、服务端协商采用WebSocket扩展时，这三个标志位可以非0，且值的含义由扩展进行定义。如果出现非零的值，且并没有采用WebSocket扩展，连接出错
* Opcode
	* 决定了应该如何解析后续的数据载荷
	* %x0：表示一个延续帧。当Opcode为0时，表示本次数据传输采用了数据分片，当前收到的数据帧为其中一个数据分片
	* %x1：表示这是一个文本帧（frame）
	* %x2：表示这是一个二进制帧（frame）
	* %x3-7：保留的操作代码，用于后续定义的非控制帧
    * %x8：表示连接断开
    * %x9：表示这是一个ping操作
    * %xA：表示这是一个pong操作
    * %xB-F：保留的操作代码，用于后续定义的控制帧
* Mask
	* 表示是否要对数据载荷进行掩码操作
	* 从客户端向服务端发送数据时，需要对数据进行掩码操作；从服务端向客户端发送数据时，不需要对数据进行掩码操作
	* 如果Mask是1，那么在Masking-key中会定义一个掩码键（masking key），并用这个掩码键来对数据载荷进行反掩码。所有客户端发送到服务端的数据帧，Mask都是1
* Payload length 
	* 0~126：数据的长度为x字节
	* 126：后续2个字节代表一个16位的无符号整数，该无符号整数的值为数据的长度
	* 127：后续8个字节代表一个64位的无符号整数（最高位为0），该无符号整数的值为数据的长度
* Masking-key
	* 所有从客户端传送到服务端的数据帧，数据载荷都进行了掩码操作，Mask为1，且携带了4字节的Masking-key。如果Mask为0，则没有Masking-key
* Payload data
	* 载荷数据：包括了扩展数据、应用数据。其中，扩展数据x字节，应用数据y字节
		* 扩展数据：如果没有协商使用扩展的话，扩展数据数据为0字节。所有的扩展都必须声明扩展数据的长度，或者可以如何计算出扩展数据的长度。此外，扩展如何使用必须在握手阶段就协商好。如果扩展数据存在，那么载荷数据长度必须将扩展数据的长度包含在内
		* 应用数据：任意的应用数据，在扩展数据之后（如果存在扩展数据），占据了数据帧剩余的位置。载荷数据长度 减去 扩展数据长度，就得到应用数据的长度   

****

* 掩码算法
	* 掩码键（Masking-key）是由客户端挑选出来的32位的随机数。掩码操作不会影响数据载荷的长度
		* original-octet-i：为原始数据的第i字节 
		* transformed-octet-i：为转换后的数据的第i字节
		* j：为i mod 4的结果
		* masking-key-octet-j：为mask key第j字节
	* 防止早期版本的协议中存在的代理缓存污染攻击（proxy cache poisoning attacks） 

``` 
j = i MOD 4
transformed-octet-i = original-octet-i XOR masking-key-octet-j
```

****

* 传送数据
	* 具体可以定义消息的类型，例如type = 1表示心跳消息，type = 2表示用户发送的消息，还可以再定义subtype，并自定义消息内容的格式，再封装一些自定义的消息机制等等 
* 30s后，双方没有传送数据，websocket连接关闭，进行四次挥手


****
* Sec-WebSocket-Key/Accept 作用
	* Sec-WebSocket-Key  是一个Base64 encode的值，这个是浏览器随机生成的
	* 服务端收到后 将Sec-WebSocket-Key跟258EAFA5-E914-47DA-95CA-C5AB0DC85B11拼接
	* 通过SHA1计算出摘要，并转成base64字符串 Sec-WebSocket-Accept
```toBase64( sha1( Sec-WebSocket-Key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11' ) )```
>  1.避免服务端收到非法的websocket连接（比如http客户端不小心请求连接websocket服务，此时服务端可以直接拒绝连接）
	2.确保服务端理解websocket连接。因为ws握手阶段采用的是http协议，因此可能ws连接是被一个http服务器处理并返回的，此时客户端可以通过Sec-WebSocket-Key来确保服务端认识ws协议。（并非百分百保险，比如总是存在那么些无聊的http服务器，光处理Sec-WebSocket-Key，但并没有实现ws协议。。。）
	3.用浏览器里发起ajax请求，设置header时，Sec-WebSocket-Key以及其他相关的header是被禁止的。这样可以避免客户端发送ajax请求时，意外请求协议升级（websocket upgrade）
	4.可以防止反向代理（不理解ws协议）返回错误的数据。比如反向代理前后收到两次ws连接的升级请求，反向代理把第一次请求的返回给cache住，然后第二次请求到来时直接把cache住的请求给返回（无意义的返回）。
	5.Sec-WebSocket-Key主要目的并不是确保数据的安全性，因为Sec-WebSocket-Key、Sec-WebSocket-Accept的转换计算公式是公开的，而且非常简单，最主要的作用是预防一些常见的意外情况（非故意的）。