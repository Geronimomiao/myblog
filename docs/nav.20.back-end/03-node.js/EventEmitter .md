---
title: EventEmitter
---
## EventEmitter 
> Node.js 中的 EventEmitter 模块就是用了发布/订阅这种设计模式，发布/订阅 模式在主体与观察者之间引入消息调度中心，主体和观察者之间完全透明，所有的消息传递过程都通过消息调度中心完成，也就是说具体的业务逻辑代码将会是在消息调度中心内完成

> Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例

> EventEmitter 提供了多个属性，如 on 和 emit。on 函数用于绑定事件函数，emit 属性用于触发一个事件

```js
on(event, listener)
为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数

once(event, listener)
为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听

removeListener(event, listener)
移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器
它接受两个参数，第一个是事件名称，第二个是回调函数名称

removeAllListeners([event])
移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器

listeners(event)
返回指定事件的监听器数组

emit(event, [arg1], [arg2], [...])
按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false
```
