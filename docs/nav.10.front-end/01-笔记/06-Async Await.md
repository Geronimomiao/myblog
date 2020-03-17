---
title: Async Await
time:  2019-11-19
author: wsm
mail: 1030057982@qq.com
---
* 使用async声明函数 返回值为 promise
	* return 出来一个普通值，会被包装成一个promise对象
	* return出来是一个Error类型，则同样会被包装成一个promise对象，该promise对象的状态是reject, 值是Error的信息
	* 如果没有return任何东西，则同样会返回一个promise对象。该promise对象的状态为fullfilled，该promsie的值为undefined.

```js
// 普通值
async function f1 () {
    return 10;
}
console.log(f1());     // Promise {<resolved>: 10}
fn1().then(function (x) {
  console.log(x);      // 10
})
```
```js
// Error类型
async function f1 () {
    return new Error('报错了');
}
console.log(f1())     // Promise {<rejected>: Error: 报错了
```
```js
async function f1 () {
    //do nothing     
}
console.log(f1());                   // Promise {<resolved>: undefined}
```

* 取 promise 对象中的值
```js
let p = Promise.resolve()
p.then(function(x) {
	console.log(x)
})


// await 关键字只能在 async 声明的函数中使用
// await 最主要的作用是代替 .then 方法
var p1 = Promise.resolve(1);
(async function() {
    console.log(await p1);
})()

// 当串联异步的操作时，await 要比.then方法更加简洁
// 使用 .then 进行串联操作
function asyncFunc() {
	otherAsyncFunc1().then(function(x){
    	console.log(x)
        return otherAsyncFunc2();
    }).then(function(x) {
        console.log(x)
    })
}

// 使用await关键字
async function asyncFunc() {
    const result1 = await otherAsyncFunc1();
    console.log(result1);
    const result2 = await otherAsyncFunc2();
    console.log(result2);
}


// 并发异步操作
const request           = require('request');
const rp                = require('request-promise');

// 使用 .then 方法
function fn1() {
    let p1 = rp('http://www.baidu.com');
    let p2 = rp('http://www.baidu.com');
    Promise.all([p1, p2]).then(function([res1, res2]) {
        console.log(res1)
        console.log(res2)
    })
}


// 使用await 关键字
async function fn1() {
    let p1 = rp('http://www.baidu.com');
    let p2 = rp('http://www.baidu.com');
    let [res1, res2] = await Promise.all([p1, p2]);
    console.log(res1)
    console.log(res2)
}

// await 本质是. then()的语法糖
// await 并没有改变node的单线程的本质，没有改变event_loop的模型，只是方便我们写代码，更快捷，更清晰
await foo();            // foo is an async function that returns a promise
console.log("hello");
等价于
foo().then(() => {
    console.log("hello");
});
```

## 真题
****
```js
async function async1() {
  console.log(1);
  const result = await async2();
  console.log(3);  // 相当于 .then(console.log(3))
}

async function async2() {
  console.log(2);
}

Promise.resolve().then(() => {
  console.log(4);
});

setTimeout(() => {
  console.log(5);
});

async1();
console.log(6);


// 1 2 6 4 3 5
```