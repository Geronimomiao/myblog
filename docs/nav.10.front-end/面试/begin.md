#### 记录一些有价值的面试题
* DOMContentLoaded 与onload
	* 当 onload 事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了
	* 当 DOMContentLoaded 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash 

* 浏览器渲染
	* css加载不会阻塞DOM树的解析
	* css加载会阻塞DOM树的渲染
	* css加载会阻塞后面js语句的执行 
	* 当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行
	* JavaScript 可以查询和修改 DOM 与 CSSOM
	* CSSOM 构建时，JavaScript 执行将暂停，直至 CSSOM 就绪
	* 渲染树（Render-Tree）的关键渲染路径中，要求同时具有 DOM 和 CSSOM，之后才会构建渲染树


![enter description here](https://img.wsmpage.cn/learning/2019-10-2/1569982440366.png) 
* script defer async
	* defer 和 async 在网络读取（下载）这块儿是一样的，都是异步的（相较于 HTML 解析）
	* defer 是最接近我们对于应用脚本加载和执行的要求的


* 减少reflow
	* 实现元素的动画，它的position属性，最好是设为absoulte或fixed，这样不会影响其他元素的布局，还可以让动画处于更高的图层（即：z-index的值更大）这也是从图层的角度进行优化的。
	* 动画实现的速度的选择。比如实现一个动画，以1个像素为单位移动这样最平滑，但是reflow就会过于频繁，大量消耗CPU资源，如果以3个像素为单位移动则会好很多。
	* 不要使用table布局，因为table中某个元素旦触发了reflow，那么整个table的元素都会触发reflow。那么在不得已使用table的场合，可以设置table-layout:auto;或者是table-layout:fixed这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围


* 实现深拷贝

``` javascript
// 取巧
const liLei = {
    name: 'lilei',
    age: 28,
    habits: ['coding', 'hiking', 'running']
}

const liLeiStr = JSON.stringify(liLei)
const liLeiCopy = JSON.parse(liLeiStr)

liLeiCopy.habits.splice(0, 1) 
console.log('李雷副本的habits数组是', liLeiCopy.habits)
console.log('李雷的habits数组是',  liLei.habits)


// 递归
function deepClone(obj) {
    // 如果是值类型，则直接return
    if(typeof obj !== 'object') {
        return obj
    }
    
    // 定义结果对象
    let copy = {}
    
    // 如果对象是数组，则定义结果数组
    if(obj.constructor === Array) {
        copy = []
    }
    
    // 遍历对象的key
    for(let key in obj) {
        // 如果key是对象的自有属性
        if(obj.hasOwnProperty(key)) {
            // 递归调用深拷贝方法
            copy[key] = deepClone(obj[key])
        }
    }
    
    return copy
} 



// 使用循环的方法
// 将 object 竖过来看当作一棵树  循环遍历一棵树，需要借助一个栈，当栈为空时就遍历完了，栈里面存储下一个需要拷贝的节点
// 改用循环后，再也不会出现爆栈的问题了
function cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}
```


