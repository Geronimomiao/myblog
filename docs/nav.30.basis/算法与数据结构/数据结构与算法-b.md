---
title: 数据结构与算法-2
time:  2019-10-14
author: wsm
mail: 1030057982@qq.com
---

**队列**
* 先进先出(线性表数据结构
	* 入队 enqueue()，放一个数据到队列尾部
	* 出队 dequeue()，从队列头部取一个元素

![enter description here](https://img.wsmpage.cn/learning/2019-10-14/1571020374545.png)

* 循环队列
	* (tail + 1) % n == head ( 判满
	* head == tail ( 判空
	* head = (head+1)%n ( 入队
	* tail = (tail+1)%n ( 出队

![enter description here](https://img.wsmpage.cn/learning/2019-10-14/1571022387228.png)

* 阻塞队列 ( 符合生产者 消费者 模型 
	* 当队头为空 取数据就会被阻塞
	* 当队列满时 存数据就会被阻塞 

![enter description here](https://img.wsmpage.cn/learning/2019-10-14/1571022578378.png)





* 并发队列
	* 当多个线程 同时操作一个队列就会存在线程安全问题 
	* 线程安全队列 我们称其为并发队列
	* 最简单直接的实现方式是直接在 enqueue()、dequeue() 方法上加锁，但是锁粒度大并发度会比较低，同一时刻仅允许一个存或者取操作
	
![enter description here](https://img.wsmpage.cn/learning/2019-10-14/1571022806935.png)


**递归**
* 使用递归的 3 个条件
	* 一个问题的解可以分解为几个子问题的解
	* 这个问题与分解之后的子问题，除了数据规模不同，求解思路完全一样
	* 存在递归终止条件 
* tip
	* 编写递归代码的关键是，只要遇到递归，我们就把它抽象成一个递推公式，不用想一层层的调用关系，不要试图用人脑去分解递归的每个步骤
	* 递归代码要警惕堆栈溢出
	* 递归代码要警惕重复计算

``` 
// 全局变量，表示递归的深度。
int depth = 0;
 
int f(int n) {
  ++depth；
  if (depth > 1000) throw exception;
  
  if (n == 1) return 1;
  return f(n-1) + 1;
}
```

![enter description here](https://img.wsmpage.cn/learning/2019-10-14/1571033107819.png)


* 通过一个数据结构（比如散列表）来保存已经求解过的 f(k)

``` 
public int f(int n) {
  if (n == 1) return 1;
  if (n == 2) return 2;
  
  // hasSolvedList 可以理解成一个 Map，key 是 n，value 是 f(n)
  if (hasSolvedList.containsKey(n)) {
    return hasSovledList.get(n);
  }
  
  int ret = f(n-1) + f(n-2);
  hasSovledList.put(n, ret);
  return ret;
}
```

****

**排序**
* 原地排序 
	* 特指空间复杂度为1的算法
* 稳定性
	* 如果待排序的序列中存在值相等的元素，经过排序之后，相等元素之间原有的先后顺序不变

==冒泡排序( Bubble Sort )==

操作相邻的两个数据。每次冒泡操作都会对相邻的两个元素进行比较，看是否满足大小关系要求。如果不满足就让它俩互换。一次冒泡会让至少一个元素移动到它应该在的位置，重复 n 次，就完成了 n 个数据的排序工作

![enter description here](https://img.wsmpage.cn/learning/2019-10-21/1571622491745.png)


![enter description here](https://img.wsmpage.cn/learning/2019-10-21/1571622503426.png)

==插入排序（ Insertion Sort )==
数组中的数据分为两个区间，已排序区间和未排序区间。初始已排序区间只有一个元素，就是数组的第一个元素。插入算法的核心思想是取未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。重复这个过程，直到未排序区间中元素为空，算法结束

![enter description here](https://img.wsmpage.cn/learning/2019-10-21/1571622605543.png)

==选择排序 ( Selection Sort )==
选择排序算法的实现思路有点类似插入排序，也分已排序区间和未排序区间。但是选择排序每次会从未排序区间中找到最小的元素，将其放到已排序区间的末尾

![enter description here](https://img.wsmpage.cn/learning/2019-10-21/1571622698047.png)




==归并排序==
![enter description here](https://img.wsmpage.cn/learning/2019-10-26/1572059042650.png)

![enter description here](https://img.wsmpage.cn/learning/2019-10-26/1572059222719.png)


```
递推公式：
merge_sort(p…r) = merge(merge_sort(p…q), merge_sort(q+1…r))
 
终止条件：
p >= r 不用再继续分解

// 归并排序算法, A 是数组，n 表示数组大小
merge_sort(A, n) {
  merge_sort_c(A, 0, n-1)
}
 
// 递归调用函数
merge_sort_c(A, p, r) {
  // 递归终止条件
  if p >= r  then return
 
  // 取 p 到 r 之间的中间位置 q
  q = (p+r) / 2
  // 分治递归
  merge_sort_c(A, p, q)
  merge_sort_c(A, q+1, r)
  // 将 A[p...q] 和 A[q+1...r] 合并为 A[p...r]
  merge(A[p...r], A[p...q], A[q+1...r])
}

// 核心就是 合并 将两个有序数组 合并为一个有序数组 
// 我们可以申请一个临时数组 大小与 A[p…r] 相同。我们用两个游标 i 和 j，分别指向 A[p…q] 和 A[q+1…r] 的第一个元素。比较这两个元素 A[i] 和 A[j]，如果 A[i]<=A[j]，我们就把 A[i] 放入到临时数组 tmp，并且 i 后移一位，否则将 A[j] 放入到数组 tmp，j 后移一位

merge(A[p...r], A[p...q], A[q+1...r]) {
  var i := p，j := q+1，k := 0 // 初始化变量 i, j, k
  var tmp := new array[0...r-p] // 申请一个大小跟 A[p...r] 一样的临时数组
  while i<=q AND j<=r do {
    if A[i] <= A[j] {
      tmp[k++] = A[i++] // i++ 等于 i:=i+1
    } else {
      tmp[k++] = A[j++]
    }
  }
  
  // 判断哪个子数组中有剩余的数据
  var start := i，end := q
  if j<=r then start := j, end:=r
  
  // 将剩余的数据拷贝到临时数组 tmp
  while start <= end do {
    tmp[k++] = A[start++]
  }
  
  // 将 tmp 中的数组拷贝回 A[p...r]
  for i:=0 to r-p do {
    A[p+i] = tmp[i]
  }
}


```

==快速排序==
![enter description here](https://img.wsmpage.cn/learning/2019-10-26/1572061627999.png)

![enter description here](https://img.wsmpage.cn/learning/2019-10-26/1572061642188.png)



```
// 如果要排序数组中下标从 p 到 r 之间的一组数据，我们选择 p 到 r 之间的任意一个数据作为 pivot（分区点
// 遍历 p 到 r 之间的数据，将小于 pivot 的放到左边，将大于 pivot 的放到右边，将 pivot 放到中间。经过这一步骤之后，数组 p 到 r 之间的数据就被分成了三个部分，前面 p 到 q-1 之间都是小于 pivot 的，中间是 pivot，后面的 q+1 到 r 之间是大于 pivot 的
// 用递归排序下标从 p 到 q-1 之间的数据和下标从 q+1 到 r 之间的数据，直到区间缩小为 1，就说明所有的数据都有序了

递推公式：
quick_sort(p…r) = quick_sort(p…q-1) + quick_sort(q+1, r)
 
终止条件：
p >= r

// 快速排序，A 是数组，n 表示数组的大小
quick_sort(A, n) {
  quick_sort_c(A, 0, n-1)
}
// 快速排序递归函数，p,r 为下标
quick_sort_c(A, p, r) {
  if p >= r then return
  
  q = partition(A, p, r) // 获取分区点
  quick_sort_c(A, p, q-1)
  quick_sort_c(A, q+1, r)
}

partition(A, p, r) {
  pivot := A[r]
  i := p
  for j := p to r-1 do {
    if A[j] < pivot {
      swap A[i] with A[j]
      i := i+1
    }
  }
  swap A[i] with A[r]
  return i
}  

```


==桶排序==

![enter description here](https://img.wsmpage.cn/learning/2019-10-26/1572091106970.png)

```
// 先对数据分组
// 再将分好组的数据分别安由小到大排序 最后在合并
function bucketSort(array, bucketSize = 5) {
    if (array.length < 2) {
        return array
    }
    const buckets = createBuckets(array, bucketSize)
    return sortBuckets(buckets)
}

function createBuckets(array, bucketSize) {
    let minValue = array[0]
    let maxValue = array[0]
    // 遍历数组，找到数组最小值与数组最大值
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i]
        } else if (array[i] > maxValue) {
            maxValue = array[i]
        }
    }
    // 根据最小值、最大值、桶的大小，计算得到桶的个数
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
    // 建立一个二维数组，将桶放入buckets中
    const buckets = []
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = []
    }
    // 计算每一个值应该放在哪一个桶中
    for (let i = 0; i < array.length; i++) {
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize)
        buckets[bucketIndex].push(array[i])
    }
    return buckets
}

function sortBuckets(buckets) {
    const sortedArray = []
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            insertionSort(buckets[i])
            sortedArray.push(...buckets[i])
        }
    }
    return sortedArray
}

// 插入排序
function insertionSort(array) {
    const { length } = array
    if (length <= 1) return

    for (let i = 1; i < length; i++) {
        let value = array[i]
        let j = i - 1

        while (j >= 0) {
            if (array[j] > value) {
                array[j + 1] = array[j] // 移动
                j--
            } else {
                break
            }
        }
        array[j + 1] = value // 插入数据
    }
}
```


==计数排序==
 A[8] 中，它们分别是：2，5，3，0，2，3，0，3

统计
 ![enter description here](https://img.wsmpage.cn/learning/2019-10-29/1572312500274.png) 
   
求和
此时 c[i] 左边表示 比 i 小的元素个数
![enter description here](https://img.wsmpage.cn/learning/2019-10-29/1572312559555.png)

排序
倒着遍历 保证稳定性 后出现 排序也在后面
![enter description here](https://img.wsmpage.cn/learning/2019-10-29/1572312966282.png)




==基数排序==
> 假设我们有 10 万个手机号码，希望将这 10 万个手机号码从小到大排序，你有什么比较快速的排序方法呢
> 先按照最后一位来排序手机号码，然后，再按照倒数第二位重新排序，以此类推，最后按照第一位重新排序。经过 11 次排序之后，手机号码就都有序了。此时排序算法必须为稳定算法
> 如果数据长度不同 可以通过补零等方法 补齐 在排序




****
稳定排序 排序后相同数据的位置 与 排序前相同
原地排序 排序过程中不申请额外的空间

![enter description here](https://img.wsmpage.cn/learning/2019-10-29/1572315759331.png)
