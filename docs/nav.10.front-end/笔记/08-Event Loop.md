---
title: Event Loop
time:  2019-11-17
author: wsm
mail: 1030057982@qq.com
---


#### What
> event loop是一个执行模型，在不同的地方有不同的实现。浏览器和NodeJS基于不同的技术实现了各自的Event Loop

#### How
> 宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macro task queue，等待后续被调用

![宏队列与微队列](https://img.wsmpage.cn/learning/2019-11-17/1573954506421.png)

* 浏览器 Event Loop
	* 当浏览器执行 JS 代码时
		* 先执行同步代码 将异步代码 放入相应队列
		* 当同步代码执行完毕( 此时调用栈为空 )
		* 执行微队列中代码( 从栈头执行至栈尾 若微队列执行过程中又产生 微任务则会插入队尾 并在本轮中执行 )  
		* 然后在从宏队列中取一个位于队首的宏任务 执行
		* 然后 执行微队列中所有代码 
		* 循环

![Event](https://img.wsmpage.cn/learning/2019-11-17/1573954693022.png)


```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3)
  });
});

new Promise((resolve, reject) => {
  console.log(4)
  resolve(5)
}).then((data) => {
  console.log(data);
})

setTimeout(() => {
  console.log(6);
})

console.log(7);

// 1 4 7 5 2 3 6
```
> 当然如果你在microtask中不断的产生microtask，那么其他宏任务macrotask就无法执行了，但是这个操作也不是无限的，拿NodeJS中的微任务process.nextTick()来说，它的上限是1000个，后面我们会讲到

* Node.js 中的 Event Loop
	* 宏队列
		*  ![](https://img.wsmpage.cn/learning/2019-11-17/1573954793598.png)
	* 微队列
		* ![](https://img.wsmpage.cn/learning/2019-11-17/1573954878082.png)

**浏览器的宏队列 微队列可以认为只有一个 而在 node 中 不同的宏任务放在不同的宏队列 不同的微任务放在不同的微队列**

* 当node.js 执行 js 代码
	* 执行全局 js 同步代码
	* 执行微队列所有代码 ( 先执行 Next Tick Queue 再执行 Other Mirco Queue )
	* 开始执行macrotask宏任务，共6个阶段，从第1个阶段开始执行相应每一个阶段macrotask中的所有任务( 其中宏任务执行 产生新的宏任务 会在下轮执行 )
		* Timers Queue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> Timers Queue ......
	   
```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})
process.nextTick(function() {
  console.log('6');
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

1
7
6
8
2
4
3
5
9
11
10
12
```
	   

****
**补充**
* Nodejs 中 setImmediate 和 setTimeout 的执行顺序
```js
setTimeout(() => {
  console.log('setTimeout');
}, 0);
setImmediate(() => {
  console.log('setImmediate');
});
// 顺序有时候一致，有时候不一致
```
* 在 nodejs 中 setTimeout(fn,0) 相当于 setTimeout(fn,1)
	* 在 nodejs 异步回调中，首先进入 timers 阶段，如果机器性能不好，进入该阶段时 1ms 已经过去了，那么 setTimeout 会首先执行。
	* 如果机器性能好，进入 timers 阶段时，setTimeOut 还在等待 1ms ，这时会执行后面的阶段，当执行到 check 阶段时，会执行 setImmediate

```js
var fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
// 此时顺序就明确了
```