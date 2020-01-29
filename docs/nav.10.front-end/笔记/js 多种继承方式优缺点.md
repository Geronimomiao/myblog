---
title: js 多种继承方式优缺点
time:  2019-11-26
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

## 原型链继承
*****
```

function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin

// 缺点
// 引用类型的属性被所有实例共享
// 若属性为非引用类型 则直接添加到对象上
// 在创建 Child 的实例时，不能向Parent传参
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]
```

## 构造函数继承 ( 经典继承
****
```
function Parent () {
    this.names = ['kevin', 'daisy'];
}

// 该方法无法被继承
// Parent.prototype.getName = function () {
//   console.log(this.name);
// }

function Child () {
	// 当使用这个构造函数创建实例的时候，prototype属性指向的原型对象就成为实例的原型对象
	// 此处仅调用 Parent 函数 用于包装 this
    Parent.call(this); 
}

var child1 = new Child();
child1.names.push('yayu');
console.log(child1.names); // ["kevin", "daisy", "yayu"]
var child2 = new Child();
console.log(child2.names); // ["kevin", "daisy"]

// 缺点
// 方法都在构造函数中定义，每次创建实例都会创建一遍方法
// 无法实现方法公用
```

## 组合继承
****
```
// 原型链继承和经典继承双剑合璧
// 缺点 会调用两次父构造函数
// Child.prototype 会挂上父类的属性
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent(); 
// Child.prototype.constructor 指向 Parent
// Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

## 原型式继承
****
```
// 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样
// 注意对比 没有提到方法问题 说明方法 (没问题 可挂在 prototype 上共享
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}

var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = 'person1';
console.log(person2.name); // kevin

person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
```

## 寄生式继承
****
```
// 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象
// 缺点 跟借用构造函数模式一样，每次创建对象都会创建一遍方法
function createObj (o) {
	// clone.__proto__ === o
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

## 寄生组合式继承
****
```
// 修正组合继承的弊端
// Child.prototype = new Parent()  而是间接的让 Child.prototype 访问到 Parent.prototype

function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```