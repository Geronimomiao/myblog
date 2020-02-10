---
title: 摘录B.md
time:  2019-12-20
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

#### 一元函数
****
接受一个参数的函数

#### 二元函数
****
接受两个参数的函数

#### 变参函数
****
接受可变参数的函数

#### 柯里化
****
将一个多参函数转为一个前套的一元函数
 Currying ——只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
```js
const curry = (fn) => {
	return function curriedFn(...args) {
    if(args.length < fn.length) {
      return function () {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)))
      }
    }
    return fn.apply(null, args)
  }
};

let add = (a, b, c) => a+b+c

let addPlus = curry(add)
console.log(addPlus(1,2)(3))
```


#### 偏应用
****
允许开发者应用部分函数参数 ( 隐藏一部分参数
```js
const partial = (fn, ...partialArgs) => {
  return function (...fillArgs) {
    let arg = 0;
    for (let i = 0; i < partialArgs.length && arg < fillArgs.length; i++) {
      if(partialArgs[i] === undefined) {
        partialArgs[i] = fillArgs[arg++]
      }
    }
    return fn.apply(null, partialArgs)
  }
};

let delayTenMs = partial(setTimeout, undefined, 1000)
delayTenMs(()=> console.log('Do your task'))
```


#### 组合函数
****
把一个函数的输出做为另一个函数的输入
方向 从右向左  👈
```js
const reduce = (array, fn, initialValue) => {
  let acc = initialValue ? initialValue : array[0]
  if (initialValue !== undefined) {
    for (let value of array) {
      acc = fn(acc, value)
    }
  } else {
    for (let i = 1; i < array.length; i++) {
      acc = fn(acc, array[i])
    }
  }
  return [acc]
}

const compose = (...fns) =>
  (value) => reduce(fns.reverse(), (acc, fn) => fn(acc), value)

// 方案二
const compose = (...fns) =>
  (value) => fns.reverse().reduce((acc, fn) => fn(acc), value)
   
```


#### 管道/序列
****
把一个函数的输出做为另一个函数的输入
方向 从左向右  👉
```js
// 同组合函数的区别 函数组执行的方向
const compose = (...fns) =>
  (value) => reduce(fns, (acc, fn) => fn(acc), value)
```

#### 调试函数
****
```js
// 在 组合调用 或 管道/序列中进行调试
const identity = (it) => {
  console.log(it)
  return it
}


let splitIntoSpaces = (str) => str.split(' ')
let count = (arr) => arr.length
let oddOrEven = (ip) => ip % 2 === 0 ? 'even' : 'odd'
const countWords = compose(count, splitIntoSpaces)
const oddOrEvenWords = compose(oddOrEven, count, identity, splitIntoSpaces)
console.log(countWords('sss ss s d sss'))
console.log(oddOrEvenWords('sss ss s d sss'))
```

#### 函子
****
是一个普通对象 实现 map 函数 ( map 契约接口
在遍历 每个对象值时 生成一个新对象
创建 of 方法只是为了在创建 Container 时 不使用 new 关键字
含有 of,  map 的 Maybe  是一个函子
含有 chain 的函子 是一个 Monad
**普通函子**
```js
const Container = function(val) {
	this.value = val
}

Container.of = function (val) {
	return new Container(val)
}

Container.prototype.map = function(fn) {
	return Container.of(fn(this.value))
} 

let double x => x*2
Container.of(3).map(double)
```

**MayBe 函子**
```js
// MayBe 函子
// 核心 检测值是否存在 不会抛异常 但不利于调试
const MayBe = function (val) {
  this.value = val
};

MayBe.of = function (val) {
  return new MayBe(val)
};

MayBe.prototype.isNothing = function () {
  return (this.value === null || this.value === undefined)
}

MayBe.prototype.map = function (fn) {
  return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value))
}
```

**Either 函子**
```js
// Either 函子

const Nothing = function (val) {
  this.value = val
};

Nothing.of = function (val) {
  return new Nothing(val)
};

Nothing.prototype.map = function (fn) {
  // 不执行给定函数 返回对象本身
  return this
};

const Some = function (val) {
  this.value = val
};

Some.of = function (val) {
  return new Some(val)
};

Some.prototype.map = function (fn) {
  return Some.of(fn(this.value))
};

const Either = {
  Some: Some,
  Nothing: Nothing
}

// 利用 try {} catch {}
let getTopPostsEither = (type) => {
  let response
  
  try {
    response = Some.of()
  } catch (err) {
    response = Nothing.of({message: 'something went wrong', err: err})
  }
  
  return response
};
```

**Pointed 函子**
* 函子实现 map 契约的接口 
* Pointed 函子是函子的字集 实现了 of 契约接口

**Monad 函子**
```js
// 含有 chain 方法 函子

// 打开嵌套 MayBe
MayBe.prototype.join = function () {
  return this.isNothing() ? MayBe.of(null) : this.value
};

// 取出容器中值
MayBe.prototype.chain = function (f) {
  return this.map(f).join()
}
```

****
**Unix 哲学**
* 每个程序只做好一件事 为了完成一项新任务 重新构建要好于在复杂的程序里添加新属性
* 每个程序的输出 应该是另一个尚未可知程序的输入

> 组合思想是把小函数 组成一个 大函数 简单函数 容易阅读 测试 维护