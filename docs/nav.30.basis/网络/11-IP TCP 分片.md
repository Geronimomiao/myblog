# IP TCP 分片

**IP分片**

* MTU
	* 是链路层中的网络对数据帧的一个限制，依然以以太网为例，MTU为1500个字节
* IP 数据报长度大于 MTU 就要进行分片传输 使每片数据报长度小于 MTU
	* 分片传输的 IP 报 不一定按序到达 但 IP 首部中的信息 能让数据包片按序组装
	* IP 数据报的分片 与 重组 是在网络层完成



**TCP分段**

* MSS
	* TCP数据包每次能够传输的最大数据分段，TCP报文段的长度大于MSS时，要进行分段传输 
	* 如果不设置，则MSS的默认值就为536个字节
	* TCP报文段的分段与重组是在运输层完成的


****

* IP分片产生的原因是链路层的MTU
* TCP分段产生原因是MSS
* 以太网MUT往往会大于MSS
* 故采用TCP协议进行数据传输，是不会造成IP分片的
* IP分片是由于UDP传输协议造成的，因为UDP传输协议并未限定传输数据报的大小

****

**IP 报文**

![enter description here](https://img.wsmpage.cn/learning/2019-9-29/1569765324212.png)

**TCP 报文**

![enter description here](https://img.wsmpage.cn/learning/2019-9-29/1569765403535.png)

* SYN 是发起一个连接，ACK 是回复，RST 是重新连接，FIN 是结束连接
