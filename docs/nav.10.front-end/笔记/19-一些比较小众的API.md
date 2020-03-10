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



