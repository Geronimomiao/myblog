---
title: 1.md
time:  2019-12-31
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

#### 响应式编程 
****
* Reactive Extension(Rx)
	* An API for asynchronous programming with observable streams

#### 一些概念
*****
* 流/数据流/Observable对象
	* 一条河流里的水 ( 数据就是这条河流中流淌的水
	* 代表流的变量标识符 用$结尾
```
// 包括已发生事件 及 未发生事件
const mouseDown$ = Rx.Observable.fromEvent(holdMeButton, 'mousedown')
```

* 函数式编程
	* 声明式
	* 纯函数
		* 函数的执行过程完全由输入参数决定 不会受除参数外任何数据的影响
		* 函数不会修改任何外部状态 ( 全局变量 / 传入参数 
	* 数据不可变性 
		* 数据状态发生变化 保持原有数据不变 产生一个新数据体现这种变化

#### 核心思想
****
* 结合观察者模式 和 迭代器模式
	* Observable(可被观察的对象) = Publisher(产生数据 + Iterator( 推式迭代器
	* Observer(观察者)(订阅者)(消费数据
	* Observable 通过 subscribe 同 Observer 产生关系 



****
****
> 在 编程世界 所谓推拉都是从数据消费者角度描述的
> 比如网页 客户端主动发起 ajax 叫拉  建立 websocket 链接 由服务端推数据 叫推

> 任何可以用 JavaScript 来写的应用 最终都会用 JavaScript 写出来

	


