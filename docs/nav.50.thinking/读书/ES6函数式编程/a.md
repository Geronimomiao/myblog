---
title:  1.md
time:  2019-12-20
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

## 好书 ( 强推 
****
**掌握ES6 的一些基本即可试读**
**本书由浅入深 层层递进**

[书中代码仓库](https://github.com/antsmartian/functional-es8)

## 一些概念及代码
****

#### 一等公民
****
当一门 允许函数作为任何其他数据使用时

#### 合理代码
****
* 必要的注释
* 见名知意
* 函数不应依赖全局变量 
	* 若并发执行 结果难以预料 


#### 闭包函数
****
* 作用域
	* 自身内声明变量
	* 全局变量访问
	* 对外部函数变量访问 


#### 高阶函数
****
* Higher-Order Function( HOC )
	* 以函数作为参数 并且或者返回函数作为输出的函数
	* 抽象 将独特功能 做成通用功能

```
// 仅执行一次的函数
const once = (fn) => {
	let done = false
	return function() {
		// 此处括号用的精妙
		return done ? undefined : (done=true, fn.apply(this, arguments))
	}
}

// 缓存
const memoized = (fn) => {
	const lookupTable = {}
	// 此处返回值 用的精妙 可参考例1运行结果
	return (arg) => lookupTable[arg] || (lookupTable[arg]=fn(arg)) 
}

// 例1
 var o = {
        a : 7,
        get a(){return 1;},//死循环
        set a(){}
};
var a = () => (o.a = 4443)
```

####  数组相关
****
```
const map = (array, fn) => {
	let results = []
	for(let value of array) {
		results.push(fn(value))
	}
	return results
}

const filter = (array, fn) => {
	let results = [];
	for(let value of array) {
		(fn(value)) ? results.push(value):undefined 
	}
	return results
}

const reduce = (array, fn, initialValue) => {
	let acc = initialValue ? initialValue : array[0]
	if(initialValue) {
		for(let value of array) {
			acc = fn(acc, value)
		}
	} else {
		// 数组第一个元素被做为初始值
		for(let i = 1;i < array.length; i++) {
			acc = fn(acc, array[i])
		}
	}	
	return [acc]
}

const sortBy = (property) => {
	return (a, b) => {
		(a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0 })
	}
}

var people = [
    {firstname: "aaFirstName", lastname: "cclastName"},
    {firstname: "ccFirstName", lastname: "aalastName"},
    {firstname:"bbFirstName", lastname:"bblastName"}
];

//sorting with respect to firstname
console.log("FirstName sort manually",people.sort((a,b) => { return (a.firstname < b.firstname) ? -1 : (a.firstname > b.firstname) ? 1 : 0 }))

//sorting with respect to lastname
console.log("LastName sort manually",people.sort((a,b) => { return (a.lastname < b.lastname) ? -1 : (a.lastname > b.lastname) ? 1 : 0 }))

//sorting with respect to firstname using sortBy
console.log("Firstname using sortBy hoc",people.sort(sortBy("firstname")))

//sorting with respect to firstname using sortBy
console.log("lastName using sortBy hoc",people.sort(sortBy("lastname")))

// ['1', '2', '3'].map(parseInt)
// map 默认有3个参数  value index array
// parseInt 默认有2个参数 第2个参数 指定转换数字的基数
// 将函数改造为 只接受一个参数的函数
const unary = (fn) => {
	return fn.length === 1 ? fn : (arg)=>fn(arg) 
}
```