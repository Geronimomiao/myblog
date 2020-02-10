---
title: bfs与dfs
---

## bfs(广度优先搜索)
广度优先搜索的思想是，对于图G和给定的节点s，广度优先搜索需要一个辅助的先进先出的队列 Q
1.将s加入到Q中
2.将s从Q总移出，用临时变量接受s，如果s没有被访问过，从s出发，发现s的所有邻接节点并放入Q中
3.访问s
4.将Q队列的第一个元素移除队列作为新的s执行2-4过程直到队列Q为空
```js
//  代码如下  请细品
function wideTraversal(node) {  
    var nodes = [];  
    if (node != null) {  
        // 队列
        var queue = [];  
        queue.unshift(node);  
        while (queue.length != 0) {  
            var item = queue.shift();  
            nodes.push(item);  
            var children = item.children;  
            for (var i = 0; i < children.length; i++)  
                queue.push(children[i]);  
        }  
    }  
    return nodes;  
}
var root = document.getElementById('root');
console.log(wideTraversal(root)); 
```

## dfs(深度优先搜索)
只要有可能，就在图中尽量“深入”，总是对最近才发现的节点v的出发边进行探索，知道该节点的所有出发边都被发现为止。一旦v的所有发出的边都被发现，搜索则“回溯”到v的前驱节点，该过程一直持续到源节点可达的所有节点都被发现为止，如果还有未发现的节点，则深度优先搜索将从这些未被发现的节点中任选一个作为新的源节点，并重复同样的搜索过程
```js
// 递归
function deepTraversal(node,nodeList) {  
    if (node) {    
            nodeList.push(node);    
            var children = node.children;    
            for (var i = 0; i < children.length; i++) 
      //每次递归的时候将  需要遍历的节点  和 节点所存储的数组传下去
                deepTraversal(children[i],nodeList);    
        }    
    return nodeList;  
}  
var root = document.getElementById('root')
console.log(deepTraversal(root,nodeList=[]))


// 非递归
function deepTraversal(node) {  
    var nodeList = [];  
    if (node) {  
        //  运用栈
        var stack = [];  
        stack.push(node);  
        while (stack.length != 0) {  
            var childrenItem = stack.pop();  
            nodeList.push(childrenItem);  
            var childrenList = childrenItem.children;  
            for (var i = childrenList.length - 1; i >= 0; i--)  
                stack.push(childrenList[i]);  
        }  
    }    
    return nodeList;  
}   
var root = document.getElementById('root')
console.log(deepTraversal(root))
```