---
title: 3.md
time:  2020-1-12
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

#### WebWorker
****
```js
// 主文件
var w1 = new Worker("..........js")
w1.addEventListener("message", evt => {})
w1.postMessage("something cool to say")

// worker 内部
addEventListener("message", evt => {})
postMessage("a really cool reply")
```
* 浏览器可提供多个 JS 引擎实例 将程序划分为多个并发块运行
* 每个 worker 同主程序之间 不会共享任何作用域 资源 通过一个基本的事件机制相互联系


#### 尾调用优化
****
```js
function foo(x) {
	return x
}
function bar(y){
	return foo(y+1)      // 尾调用
}
function baz() {
	return 1+bar(40)   // 非尾调用
}
baz(40) // 42
```
* 调用一个新函数需要额外的一块预留内存来管理调用栈 栈帧
* 支持 TCO 引擎 能意识到 foo(y+1) 调用位于尾部 意味着 bar() 基本完成无需创建新栈帧 可以重用已有的 bar() 栈帧

#### Generator 函数
* 返回值为遍历器对象
	* 做为构造函数 并不会生效 返回遍历器对象 而非 this 对象
	* 只有调用 next 方法才会遍历下一个状态
```js
function* f() {
	for(var i = 0; true; i++) {
		var reset = yield i
		if(reset) {i=-1}
	}
}

var g = f()
g.next()
g.next()
g.next(true)
// next 方法参数表示上一个 yield 语句的返回值
// g.next() {value: xxxx, done: false}  xxxx 为 yield 抛出的值
// 可以从外部向函数内部注入不同的值 从而调整函数行为 也可以将内部值抛向外部
```

****
****
* 变量的主要用途
	* 管理程序状态
	* 状态跟踪了值随程序的变化 
* JS中变量作用域基本单元是函数 
* async 返回 Promise 对象 必须等内部所有的 await 命令后面的 Promise 对象执行完 才会发生状态改变
	* 除非 return/抛异常
* await 后跟 Promise 
	* 若不是 则会被转为 Promise
* for ... of 循环可自动遍历用 Generator 函数时生成的 Iterator 对象
	* Promise.all([p1, p2, p3])  // 多个请求并发执行
	* Promise.race([p1, p2, p3])  // 有一个返回则改变     
* async 是 Generator 函数语法糖
* ES6 以前 异步编程方法
	* 回调函数
	* 事件监听
	* 发布/订阅
	* Promise 对象
* Promise 不是新的语法功能 
	* 而是一种新写法 允许将回调函数嵌套 改为链式调用   
* Async 函数
	* 完全可以看作多个异步操作 包装成一个 Promise 对
	*  Await 命令 then 命令的语法糖 

> JS 中变量是没有类型的 只有值才有 变量随时可以持有任何类型的变量
> 多个脚本文件会在共享的全局命名空间中加载该变量
> 数组是通过数字进行索引 但有趣的是他们也是对象 可以包含字符串的键值和属性 ( 不计算在数组长度内 如果字符串能够被强类型转换为数字 会被当作数字索引处理
> 字符串不可变是指字符串成员函数不会改变其原始值 而是创建并返回一个新的字符串