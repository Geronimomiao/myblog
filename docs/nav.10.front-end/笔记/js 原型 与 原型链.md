---
title: js 原型 与 原型链
time:  2019-11-26
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---


## 基础
****

> 每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针
> 如果试图引用对象(实例instance)的某个属性,会首先在对象内部寻找该属性,直至找不到,然后才在该对象的原型(instance.prototype)里去找这个属性

* 一切皆对象，对象又可以分为两类
    * 普通对象 
        * 除了函数对象之外的对象都是，包括new函数对象()产生的实例，普通对象没有prototype，也就没有继承和原型链一说
    * 函数对象 
        * 系统内置的函数对象：Function、Object、Array、String、Number ，Function其实充当了函数对象的构造器，比如Object对象的构造源码其实是Function Object() {[native code]}的形式，这一点对于理解原型链很重要
        * 由function创造出来的函数
    
```js
      function f1() {
     
      } 
      var f2 = function() {
      
      }
      var f3 = new Function('x','console.log(x)');
      // 以上都是函数对象
```


#### 讲解用到的代码
```js
function Foo(){
    //属性和方法
}
var f1 = new Foo();
var f2 = new Foo(); 
var o1 = new Object();
var o2 = new Object();
```

![enter description here](https://img.wsmpage.cn/learning/2019-11-26/1574766905087.png)


![enter description here](https://img.wsmpage.cn/learning/2019-11-28/1574907374240.png)

* js 中一切皆对象
* 每个对象都有__proto__属性，用于储存继承得来的方法和属性
* 每个函数对象都有prototype属性，用于继承，将其中定义的属性和方法传递给‘后代’（比如实例化）

    * f1为何有Foo、Object的原型方法，其实就是通过原型链继承
    * 继承的过程可以表示为f1.\__proto\__ = Foo.prototype，即对象.\__proto\__ = 构造器.prototype

* 在js中 并不能说对象有原型 而应该说对象的构造器有原型 对象把请求委托给自己构造器的原型
* js 提供了__proto__的隐藏属性 某个对象的__proto__属性会默认指向{constructor}.prototype


#### Object 和 Function 的关系
> 一切对象都最终继承自Object对象，Object对象直接继承自根源对象null
* 一切对象都包含有Object的原型方法，Object的原型方法包括了toString、valueOf、hasOwnProperty等等，在js中不管是普通对象，还是函数对象都拥有这些方法
* 一切对象的原型链最终都是.... → Object.prototype → null
    * 定义一个num变量var num = 1，则num的原型链为x → Number.prototype → Object.prototype → null
    * 定义一个函数对象fn function fn() {}，则fn的原型链为fn → Function.prototype → Object.prototype → null

> 一切函数对象（包括Object对象)都直接继承自Function对象
* ![enter description here](https://img.wsmpage.cn/learning/2019-11-26/1574766930510.png)

> Function的原型链为 Function → Function.prototype → Object.prototype → null
> Object的原型链为 Object → Function.prototype → Object.prototype → null

> Question:
> 一切对象继承自Object，Object又继承自Function，那一切对象是不是都有Function的原型方法？ 
> Answer:
> 不对，普通对象都没有Function的原型方法。从我们所写原型链中可以看出，Object是继承自Function，而Object也有Function的原型方法（比如bind），但Object继承得到的方法储存于__proto__属性中，普通对象从Object继承到的原型方法却在于prototype属性中，因而不对



## 总结
****
* 一切对象都继承自Object.prototype，而一切函数对象都继承自Function.prototype(且Function.prototype会最终继承自Object.prototype)
* 普通对象和函数对象的区别是：普通对象直接继承了Object.prototype，而函数对象在中间还继承了Function.prototype


> 原型同样也可以通过 \__proto__ 访问到原型的原型，比方说这里有个构造函数 Person 然后“继承”前者的有一个构造函数 People，然后 new People 得到实例 p
> 当访问 p 中的一个非自有属性的时候，就会通过 \__proto__ 作为桥梁连接起来的一系列原型、原型的原型、原型的原型的原型直到 Object 构造函数为止



![enter description here](https://img.wsmpage.cn/learning/2019-11-28/1574932859847.png)


[推荐链接1](https://juejin.im/post/5a94c0de5188257a8929d837)
[推荐链接2](https://juejin.im/post/5c8a692af265da2d8763b744)
