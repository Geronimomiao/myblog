---
title: js 对象类型 转 基本类型 ( ToPrimitive )
time:  2019-11-21
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

## 值的类型
****
* 原始值
	* null
	* undefined
	* number
	* string
	* boolean 
	
* 对象值
	* 除了原始值外，其他的所有值都是对象类型的值，包括数组(array)和函数(function)等 

* symbol ( ES6 新增 

## ToPrimitive
****
> Symbol.toPrimitive 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数


* hint 取值 string number default
	* hint 值为 "string" 时，先调用 toString，toString 如果返回一个基本类型值了，则返回、终止运算；否则接着调用 valueOf 方法。
	* 否则，先调用 valueOf，valueOf 如果返回一个基本类型值了，则返回、终止运算；否则接着调用 toString 方法
	* Symbol.toPrimitive 和 toString 方法的返回值必须是基本类型值
	* valueOf 方法除了可以返回基本类型值，也可以返回其他类型值

## ==
****
![enter description here](https://img.wsmpage.cn/learning/2019-11-21/1574297477895.png)
 
> 1. undefined == null，结果是true。且它俩与所有其他值比较的结果都是false。
> 2. String == Boolean，需要两个操作数同时转为Number。
> 3. String/Boolean == Number，需要String/Boolean转为Number。
> 4. Object == Primitive，需要Object转为Primitive(具体通过valueOf和toString方法)。
> 5. Object == Boolean，需要Boolean转为Number  然后见3。

[推荐网站](https://felix-kling.de/js-loose-comparison/)

## ++[[]][+[]]+[+[]]==10
****
*  4.1 ECMAScript 运算符优先级 可以这样拆分
```
(++[[]][+[]])
+
([+[]])
```
* +[]
	* 根据 4.2 ECMAScript 一元运算符（+、-） 可以知道，一元运算符会调用 ToNumber 方法把 ToNumber([]) 转化成数字
	* 根据 5.5 ToNumber(x) 的转换规则，x为[]是数组对象，因此会调用 ToPrimitive 方法
	* 根据 5.4 ToPrimitive(input [ , PreferredType]) 的转换规则，空数组先调用 valueOf() 方法，得到[]不是原始值，继续调用 toString() 方法，得到 ""空字符串 
	* 递归的调用之后成了 ToNumber("") ,答案显而易见，根据 5.5 ToNumber(x) 的转换规则对照图片可以看出ToNumber("")===0。 那么[+[]]就变相的成了[0] 
* ++[[]][+[]]
	* ++[[]][0]
	* ++[]
	* 1
* 合并
	* 1 + [0] == 10
	* 1 + '0' == 10    


[推荐网站](https://github.com/jawil/blog/issues/5)


```js
console.log(([][[]]+[])[+!![]]+([]+{})[!+[]+!![]])  //  nb
```

