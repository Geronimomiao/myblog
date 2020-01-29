---
title: 数据结构与算法-4
time:  2019-11-1
author: wsm
mail: 1030057982@qq.com
---
==哈希表==
> 散列表用的是数组支持按照下标随机访问数据的特性，所以散列表其实就是数组的一种扩展，由数组演化而来。可以说，如果没有数组，就没有散列表

![enter description here](https://img.wsmpage.cn/learning/2019-11-1/1572570208944.png)

* 散列冲突
	* 开放寻址法
	* 二次探测
	* 双重散列
	* 链表法 

> 散列表来源于数组，它借助散列函数对数组这种数据结构进行扩展，利用的是数组支持按照下标随机访问元素的特性

```
class HashTable {
        constructor() {
            this.table=[];
        }
        //散列函数
        loseHashCode(key){
            var hash=0;
            //从ASCII表中查到的ASCII值加到hash中
            for (var i=0;i<key.length;i++){
                hash+=key.charCodeAt(i);
            }
            //为了得到比较小的数值，我们会用hash和任意数除余
            return hash%37;
        }
        //向散列表增加一个新的项
        put(key,value){
            var position=this.loseHashCode(key);
            console.log(position+'-'+key);
            this.table[position]=value;
        }
        //根据键从散列表删除值
        remove(key){
            this.table[this.loseHashCode(key)]=undefined;
        }
        //返回根据键值检索到的特定的值
        get(key){
            console.log(this.table[this.loseHashCode(key)])
        }
        print(){
            for (var i=0;i<this.table.length;++i){
                if (this.table[i]!==undefined){
                    console.log(i+':'+this.table[i]);
                }
            }
      }
 }
```

==哈希算法==

将任意长度的二进制值串映射为固定长度的二进制值串，这个映射的规则就是哈希算法，而通过原始数据映射之后得到的二进制值串就是哈希值


> 散列冲突
> 基于组合数学中一个非常基础的理论，鸽巢原理（也叫抽屉原理）。这个原理本身很简单，它是说，如果有 10 个鸽巢，有 11 只鸽子，那肯定有 1 个鸽巢中的鸽子数量多于 1 个，换句话说就是，肯定有 2 只鸽子在 1 个鸽巢内

> 字典攻击
> 针对字典攻击，我们可以引入一个盐（salt），跟用户的密码组合在一起，增加密码的复杂度

> 应用
> 安全加密、数据校验、唯一标识、散列函数 、负载均衡、数据分片、分布式存储


==树==
> 非线性表结

![enter description here](https://img.wsmpage.cn/learning/2019-11-2/1572693769955.png)

![enter description here](https://img.wsmpage.cn/learning/2019-11-2/1572693785578.png)

![enter description here](https://img.wsmpage.cn/learning/2019-11-2/1572693901388.png)

==二叉树==
> 每个节点最多有两个“叉”，也就是两个子节点，分别是左子节点和右子节点。不过，二叉树并不要求每个节点都有两个子节点，有的节点只有左子节点，有的节点只有右子节点

![enter description here](https://img.wsmpage.cn/learning/2019-11-2/1572694156870.png)

> 编号 2 的二叉树中，叶子节点全都在最底层，除了叶子节点之外，每个节点都有左右两个子节点，这种二叉树就叫作满二叉树
> 编号 3 的二叉树中，叶子节点都在最底下两层，最后一层的叶子节点都靠左排列，并且除了最后一层，其他层的节点个数都要达到最大，这种二叉树叫作完全二叉树

> 存储一棵二叉树
> 链式存储法
![enter description here](https://img.wsmpage.cn/learning/2019-11-2/1572694576618.png)

> 数组的顺序存储法

![enter description here](https://img.wsmpage.cn/learning/2019-11-2/1572694587977.png)

* 如果节点 X 存储在数组中下标为 i 的位置，下标为 2 * i 的位置存储的就是左子节点，下标为 2 * i + 1 的位置存储的就是右子节点
* 反过来，下标为 i/2 的位置存储就是它的父节点。通过这种方式，我们只要知道根节点存储的位置（一般情况下，为了方便计算子节点，根节点会存储在下标为 1 的位置），这样就可以通过下标计算，把整棵树都串起来

> 二叉树的遍历

* 前序遍历是指，对于树中的任意节点来说，先打印这个节点，然后再打印它的左子树，最后打印它的右子树
* 中序遍历是指，对于树中的任意节点来说，先打印它的左子树，然后再打印它本身，最后打印它的右子树
* 后序遍历是指，对于树中的任意节点来说，先打印它的左子树，然后再打印它的右子树，最后打印这个节点本身

```
前序遍历的递推公式：
preOrder(r) = print r->preOrder(r->left)->preOrder(r->right)
 
中序遍历的递推公式：
inOrder(r) = inOrder(r->left)->print r->inOrder(r->right)
 
后序遍历的递推公式：
postOrder(r) = postOrder(r->left)->postOrder(r->right)->print r

```

```
void preOrder(Node* root) {
  if (root == null) return;
  print root // 此处为伪代码，表示打印 root 节点
  preOrder(root->left);
  preOrder(root->right);
}
 
void inOrder(Node* root) {
  if (root == null) return;
  inOrder(root->left);
  print root // 此处为伪代码，表示打印 root 节点
  inOrder(root->right);
}
 
void postOrder(Node* root) {
  if (root == null) return;
  postOrder(root->left);
  postOrder(root->right);
  print root // 此处为伪代码，表示打印 root 节点
}
```

==二叉查找树==
> 二叉查找树要求，在树中的任意一个节点，其左子树中的每个节点的值，都要小于这个节点的值，而右子树节点的值都大于这个节点的值
> 中序遍历二叉查找树，可以输出有序的数据序列，时间复杂度是 O(n)，非常高效

![enter description here](https://img.wsmpage.cn/learning/2019-11-2/1572699922945.png)

==平衡二叉查找树==
> 二叉树中任意一个节点的左右子树的高度相差不能大于 1

![enter description here](https://img.wsmpage.cn/learning/2019-11-4/1572848677896.png)

==红黑树==

* 根节点是黑色的
* 每个叶子节点都是黑色的空节点（NIL），也就是说，叶子节点不存储数据
* 任何相邻的节点都不能同时为红色，也就是说，红色节点是被黑色节点隔开的
* 每个节点，从该节点到达其可达叶子节点的所有路径，都包含相同数目的黑色节点

![enter description here](https://img.wsmpage.cn/learning/2019-11-4/1572850021866.png)

> 红黑树是一种平衡二叉查找树。它是为了解决普通二叉查找树在数据更新的过程中，复杂度退化的问题而产生的。红黑树的高度近似 log2n，所以它是近似平衡，插入、删除、查找操作的时间复杂度都是 O(logn)

> 因为红黑树是一种性能非常稳定的二叉查找树，所以，在工程中，但凡是用到动态插入、删除、查找数据的场景，都可以用到它。不过，它实现起来比较复杂，如果自己写代码实现，难度会有些高，这个时候，我们其实更倾向用跳表来替代它


****
链表是特殊化的树 树是特殊化的图