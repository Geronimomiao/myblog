---
title: 1.md
time:  2019-12-25
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

#### 笔记
****
**类型**
* string
* number
* boolean
* null
* undefined
* object

* 函数( 可调用对象
	* 本质和普通对象一样  只是可以被调用

**内置对象**
    * String
    * Number
    * Boolean
    * Object
    * Function
    * Array
    * Date
    * RegExp
    * Error  

**对象访问**
* 对象属性名永远为字符串
* 无论你传什么值 都会首先被转为字符串 
```
obj.XX  属性访问
obj[XX] 键访问
```
* 所有对象创建时 [[Prototype]]属性都会被赋予一个非空值
* 对于默认[[Get]]操作 如果无法在对象本身找到需要的属性 就会继续访问对象的[[Prototype]]链
* Object.create() 创建一个对象 并把这个对象的[[Prototype]]关联到指定对象
* 所有普通的[[Prototype]]最终会指向内置对象 Object.prototype 
* JS 中只有对象 是少有的可以不通过类直接创建对象的语言( 因为根本不存在类
* a instanceof Foo  ( a的整条[[Prototype]]链中 是否有指向 Foo.prototype 的对象
* b.isPrototypeof(a)  ( b是否出现在a的[[Prototype]]链中
* [[Prototype]]机制就是对象中的一个内部链接 引用另一个对象

* super 并不像 this 一样晚绑定(动态绑定 
	* 在[[HomeObject]].[[Prototype]] 上 [[HomeObject]] 会创建时 自动绑定

* 类只是一种设计方式 我们在js中可以 行为委托(对象关联) 来 进行设计
	* 传统的面向对象的设计模 类定义后就不会修改 所以类的设计模式就不支持修改
	* JS 最强的特性之一 就是它的动态性 class 似乎想告诉你 动态实现太难了 我们就假装成静态吧
	* 对于 JS 是多么悲伤的评论啊


****
****
**JavaScript中为什么string可以拥有方法？**
>  基本包装类型
除了一开始提到的Object、Array等引用类型，JavaScript还为我们提供了三种特殊的引用类型：String、Number和Boolean，方便我们操作对应的基本类型。
继续看上面的剪辑字符串的例子，有没有注意到，尽管使用了substring方法，realMessage本身的值是不会变的，调用这个方法只是返回了一个新的字符串。
这就是基本包装类型的作用了。本来你是没有方法的，但是你想用方法的时候，你尽管调，对应的基本包装类型有这个方法就行。例如上面的substring方法，string这个基本类型是不可能有这个方法的，但是String这个包装类型有啊，它会吭吭哧哧地把这个方法执行完把结果返回。在执行到：

```javascript
realMessage.substring(5,15)

var _realMessage=new String("Said I love you but I lied");
var myMessage=_realMessage.substring(5,15);
_realMessgae=null; //方法调用后即销毁
```

**New 方法**
```javascript
function create(Con, ...args) {
	let obj = {}
	//  挂载方法
	Object.setPrototypeOf(obj, Con.prototype)
	//  挂载属性
	let result = Con.apply(obj, args)
	//  判断构造函数执行结果返回值是否为对象
	//  若为对象则返回该对象
    return result instanceof Object ? result : obj
  }
```

**鸭子模型**
* 如果看起来像鸭子 叫起来像鸭子 那就一定是鸭子

****
> JS 中变量是没有类型的 只有值才有 变量随时可以持有任何类型的变量
> 多个脚本文件会在共享的全局命名空间中加载该变量
> 数组是通过数字进行索引 但有趣的是他们也是对象 可以包含字符串的键值和属性 ( 不计算在数组长度内 如果字符串能够被强类型转换为数字 会被当作数字索引处理
> 字符串不可变是指字符串成员函数不会改变其原始值 而是创建并返回一个新的字符串