---
title: https
time:  2019-10-16
author: wsm
mail: 1030057982@qq.com
---

**引子**
* 当你打自己的网站 会发现莫名被注入广告
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571194756217.png)

* 因为网站被运营商劫持了，它往你的html里面注入了一段广告的html

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571194799889.png)


* 种劫持也叫http劫持只发生在http连接上，而https的连接是没这个问题的，基本只要打开的是https的网页都不会被注入广告。因为传输的数据都是加密的，中间人收到的是一串无法解密的文本，它也不知道怎么篡改

* 防火防盗防运营商
	* 但是注入广告还算是小事，因为如果是http连接你的数据在网络上都是明文传输的，包括你的密码等敏感信息，你和服务器之间经过的路由都可以嗅探到你的数据，可以做些修改如嵌入一个广告，做一些破坏，或者只单纯的抓取信息如邮件内容、账号密码等。所以使用https是很有必要的


**正文**
* 中间人攻击
	* 域名污染
	* APR欺骗

* https连接的过程
	

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571195484582.png)

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571196725166.png)


==Client Hello #03A9F4==

* TLS 版本
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571212257605.png) 

* 随机字符串
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571212330960.png)

* sessionID
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571212392351.png)

* 浏览器支持加密方式
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571212479773.png)

* 域名
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571212529131.png)

* https = http + tls
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571212576524.png)

数据传输还是用的http，加密用的tls ( ssl 是 tls 前身


==Server Hello #03A9F4==


* Version Random
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571212743334.png)

* 服务端选择加密方式
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571212914675.png)

* 使用 http 版本
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571213048409.png)


==Certificate证书 #03A9F4==

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571213620341.png)

* 由服务端发来证书
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571214580768.png)

* 证书公钥
![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571215517919.png)
```
publicKey = (N, e) // N 是一个大整数 由两个质数相乘得到
```

* RSA算法
	* p q (两个不相等的质数)
	* n(p和q的乘积)
	* φ(n) (φ(n) = (p-1)(q-1) 计算n 的欧拉函数)
	* e (随机选择一个整数e，条件是1< e < φ(n)，且e与φ(n) 互质)
	* d (计算e对于φ(n)的模反元素d) (ed ≡ 1 (mod φ(n)))

* 将n和e封装成公钥，n和d封装成私钥
	* 上述共涉及6个数 有无可能在已知n和e的情况下，推导出d 
		* ed≡1 (mod φ(n))。只有知道e和φ(n)，才能算出d
		* φ(n)=(p-1)(q-1)。只有知道p和q，才能算出φ(n)
		* n=pq。只有将n因数分解，才能算出p和q
	* 如果n可以被因数分解，d就可以算出，也就意味着私钥被破解
	* 大整数的因数分解，是一件非常困难的事情。目前，除了暴力破解，还没有发现别的有效方法

* 加密 (要加密信息m 加密后信息c
	* me ≡ c (mod n)
	
* 解密 
	* cd ≡ m (mod n)	

==密钥交换 #03A9F4==

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571224648809.png)

* 浏览器结合服务器发给它的随机密码(Server Hello)，生成它自己的主密钥，然后发送公钥发给服务器


![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571224816305.png)

* 双方交换密钥之后，浏览器给服务器发了一个明文的Change Cipher Spec的包，告诉服务器我已经准备好了，可以开始传输数据了


* 服务器也会给浏览器发一个Change Cipher Spec的包

* 浏览器给服务回了个ACK，然后就开始传输数据

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571225000542.png)

* 传输数据是用的http传输的，但是数据是加密的，没有密钥是没办法解密的

![enter description here](https://img.wsmpage.cn/learning/2019-10-16/1571227601616.png)

* AES 对称加密算法
* 服务器选择的数据传输加密方式为AES，AES是一种高效的加密方式，它会使用主密钥生成另外一把密钥

**弊端**
* 加密和解密需要占用更多的CPU，并且加密后的数据会变大
* 除了正常的tcp连接之外，还要建立ssl连接
* 建立https需要花费时间(~0.3s)
* 数据加密后比原信息更大，占用更多的带宽


[推荐链接](https://www.jianshu.com/p/ae9761bec4db)

![enter description here](https://img.wsmpage.cn/learning/2019-10-19/1571448616886.png)


![https](https://img-blog.csdnimg.cn/20200228194747189.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)