---
title: 2.md 
time:  2019-12-30
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

### 数据类型
* 类型是值的内部特征 定义了值的行为 使其区别于其他值
* 数组通过数字索引 它们也是对象 所以包括 字符串键值和属性( 不计算在数组长度中
* JS 无整数 只有双精度浮点数
	* tofixed() 指定小数部分显示位数
	* toPrecision() 指定有效位数显示
* 赋值和参数传递可以通过值复制(value-copy)或引用复制(reference-copy)完成
	* 简单值总是通过值复制的方式来赋值/传递
	* 想要通过函数改变简单值 要将简单值封装到对象中传递给函数 
* JS 中没有指针 JS 中变量不能指向另一个变量的引用  如果一个值有 10 个引用 这些引用指向同一个值 他们之间没有关系 
* Object.prototype.toString.call("abc")
	* 获取对象[[class]] 
	* 简单值会自动封装
* 将值从一种类型转换为另一种类型 
	* 类型转换  ( 静态语言在编译阶段完成
	* 强制类性转换 ( 动态语言运行时
*  JSON.stringfy() 
	* 在对象中遇到 undefined, function, symbol 会自动忽略
	* 在数组中遇到返回 null
* [[ToNumber]]
	* true -> 1
	* false -> 0
	* undefined -> NAN
	* null -> 0
* [[ToPrimitive]]
	* 会首先检查该值是否有 valueOf() 方法 有且返回基本类型 使用该值进行强制类型转换 
	* 若没有则使用 toString() ......
	* 若valueOf()和toString()均不返回基本类型 则产生TypeError
* [[ToBoolean]]
	* undefined, null, false, '', +0, -0 (falsy value)
	* 除了此6值 其他值均转换为 true

**知识点补充**
****
* switch case 中的 true 是严格比较
	* case !!(a||b == 10) 
* try catch finally
```
  function foo() {
	  // finally 语句必会执行 
	  try {
		return 42
	  } finally {
		console.log('hello')
	  }
  }
```
* 运算符优先级
	*  && > || > ? : 
* JS引擎本身没有时间概念 只是需要一个执行 JS 任意代码片段的环境
	 * 发起一个 ajax 请求 从服务端获取一些数据 在一个函数中(通常称为回调函数)设置响应服务端数据的代码 JS 引擎会通知宿主环境 '嘿 现在我要执行暂停 等你一旦完成网络请求 拿到数据 就请调用这个函数' 
* TDZ( 暂时性死区
	* 若代码中变量没有初始化 则不能提前被引用 
* == 比较规则
	* 如果等号双方类型相同 则同 ===
	* 若不同 
		* 字符串 同 数字 则转为数字
		* 有 bool 值 将 bool 转为数字
		* 有对象则将对象转为原始值 在做比较 
			* valueOf
			* toString
* 开发者工具
	* shift + enter 多行输入
* js 运行前会动态编译 
> JS 是动态语言，任何一段代码在执行之前都需要编译，它跟传统的语言不同，它不是提前编译的，编译结果也不能在分布式系统中进行移植 
[推荐链接1](https://segmentfault.com/a/1190000009851856)
[推荐链接2](https://segmentfault.com/a/1190000021388756)
