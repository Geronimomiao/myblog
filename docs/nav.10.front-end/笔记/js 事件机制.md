---
title: js 事件机制
time:  2019-11-6
author: wsm
mail: 1030057982@qq.com
---

监听事件
****
```
var EventUtil ={
    addHandler: function(element, type, handler){
        //w3c
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }
        //ie
        else if(element.attachEvent){
            element.attachEvent('on' + type,handler);
        }else{
            element['on' + type] = handler;
        }
    },
    removeHandler: function(){
        if(element.removeEventListener){
            element.removeEventListener(type, handler, false);
        }else if(element.detachEvent){
            element.detachEvent('on' + type, handler);
        }else{
            element['on' + type] = null;
        }
    }
}


var btn = document.getElementById('mybtn');
var handler = function(){
    alert("111")
};
//add click
EventUtil.addHandler(btn, 'click', handler);
//remove click
EventUtil.removeHandler(btn, 'click', handler);
```

事件触发
****
> 每个事件触发 会有3个阶段 事件捕获 处于目标 事件冒泡


![enter description here](https://img.wsmpage.cn/learning/2019-11-6/1573004577420.png)



> 事件委托通俗来讲就是利用冒泡的原理，把事件追加到父级，触发执行效果。比如当一个父节点下的多个子节点绑定相同的事件时，可以利用事件冒泡机制，将事件委托给父元素执行，这时候只需要绑定一个事件便可以触发子元素的事件

**优点**
* 只需注册一个事件，节省大量内存空间
* 可以实现 当新增子元素时不需再为其绑定事件，尤其是动态部分的内容，比如Ajax不需再为新增的元素进行绑定和对删除的元素解除绑定

```
<ul id="ul">
     <li>111</li>
      <li>222</li>
     <li>333</li>
</ul>
```


```
var Oul=document.getElementById("ul");
var Oli=Oul.getElementsByTagName("li");
for(var i=0;i<Oli.length;i++){
      Oli[i].onclick=function(){
        alert(123);
     }
}


var Oul=document.getElementById("ul");
Oul.onclick=function(e){
      var e=e || window.event;
	  // 获取触发事件的元素
      var target=e.target ||  e.srcElement;
      if(target.nodeName.toLowerCase()=='li'){
             alert(123);
             alert(target.innerHTML);
      }
} 
```

****
addEventListener()可以控制事件顺序的优点，既在addEventListener()里添加一个参数false（执行冒泡）或者true（执行捕获），addEventListener()默认为false
