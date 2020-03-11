---
title: 一些有价值的API
---

## DocumentFragment

DocumentFragment接口表示没有父级的最小文档对象。它被用作轻量级版本，Document以像标准文档一样存储由节点组成的文档结构的片段。关键区别在于，由于文档片段不是实际DOM结构的一部分，它是一个虚拟的dom节点，存在于内存中，所以对片段所做的更改不会影响文档，导致回流，或者在进行更改时可能会发生任何性能影响

一个常见的用途DocumentFragment是创建一个，在其中组装一个DOM子树，然后使用Node诸如appendChild()或（或insertBefore()）之类的接口方法将该片段附加或插入到DOM中。这样做会将片段的节点移动到DOM中，留下空白DocumentFragment。因为所有的节点都被一次性插入到文档中，所以如果单独插入，则每个节点只会触发一个回流和渲染

```js
 var oFrag=document.createDocumentFragment();
for (var i=0;i<100;i++) {
    var op=document.createElement("P");
    var oText=document.createTextNode(i);
    op.appendChild(oText);
    oFrag.appendChild(op);
}
document.body.appendChild(oFrag);
```

[详细链接](https://juejin.im/post/590f4eadac502e006cf718c3)


## MutationObserver

Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知

概念上，它很接近事件，可以理解为 DOM 发生变动就会触发 Mutation Observer 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发

这样设计是为了应付 DOM 变动频繁的特点。举例来说，如果文档中连续插入1000个 <li>元素，就会连续触发1000个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 Mutation Observer 完全不同，只在 1000 个段落都插入结束后才会触发，而且只触发一次


```js
var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});

// observe  — 启动监听
// disconnect — 用来停止观察
// takeRecords — 返用来清除变动记录，即不再处理未处理的变动。

// 开始侦听页面的根 HTML 元素中的更改。
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});
```


[传送门1](https://javascript.ruanyifeng.com/dom/mutationobserver.html)

[传送门2](https://blog.fundebug.com/2019/01/10/understand-mutationobserver/)

[传送门3](https://fecoding.cn/2016/09/08/learning-mutationobserver/)