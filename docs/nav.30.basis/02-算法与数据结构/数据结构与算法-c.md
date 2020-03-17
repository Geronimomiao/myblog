---
title: 数据结构与算法-3
time:  2019-10-29
author: wsm
mail: 1030057982@qq.com
---
==二分查找==
时间复杂度是 O(logn)
性能比较优秀，但应用场景也比较有限。底层必须依赖数组，并且还要求数据是有序的。对于较小规模的数据查找，我们直接使用顺序遍历就可以了，二分查找的优势并不明显。二分查找更适合处理静态数据，也就是没有频繁的数据插入、删除操作

![enter description here](https://img.wsmpage.cn/learning/2019-10-29/1572345404331.png)


> 查找第一个值等于给定值的元素

```
public int bsearch(int[] a, int n, int value) {
  int low = 0;
  int high = n - 1;
  while (low <= high) {
    int mid =  low + ((high - low) >> 1);
    if (a[mid] > value) {
      high = mid - 1;
    } else if (a[mid] < value) {
      low = mid + 1;
    } else {
      if ((mid == 0) || (a[mid - 1] != value)) return mid;
      else high = mid - 1;
    }
  }
  return -1;
}
```

> 查找最后一个值等于给定值的元素

```
public int bsearch(int[] a, int n, int value) {
  int low = 0;
  int high = n - 1;
  while (low <= high) {
    int mid =  low + ((high - low) >> 1);
    if (a[mid] > value) {
      high = mid - 1;
    } else if (a[mid] < value) {
      low = mid + 1;
    } else {
      if ((mid == n - 1) || (a[mid + 1] != value)) return mid;
      else low = mid + 1;
    }
  }
  return -1;
}
```

> 查找第一个大于等于给定值的元素
> 改值可能不再数组中 极端情况 全部大于 全部小于

```
public int bsearch(int[] a, int n, int value) {
  int low = 0;
  int high = n - 1;
  while (low <= high) {
    int mid =  low + ((high - low) >> 1);
    if (a[mid] >= value) {
      if ((mid == 0) || (a[mid - 1] < value)) return mid;
      else high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}
```

> 查找第一个小于等于给定值的元素
```
public int bsearch7(int[] a, int n, int value) {
  int low = 0;
  int high = n - 1;
  while (low <= high) {
    int mid =  low + ((high - low) >> 1);
    if (a[mid] > value) {
      high = mid - 1;
    } else {
      if ((mid == n - 1) || (a[mid + 1] > value)) return mid;
      else low = mid + 1;
    }
  }
  return -1;
}
```

==跳表==

> 那怎么来提高查找效率呢？如果像图中那样，对链表建立一级“索引”，查找起来是不是就会更快一些呢？每两个结点提取一个结点到上一级，我们把抽出来的那一级叫作索引或索引层。你可以看我画的图。图中的 down 表示 down 指针，指向下一级结点。

![enter description here](https://img.wsmpage.cn/learning/2019-10-31/1572490355177.png)

> 比如 16。我们可以先在索引层遍历，当遍历到索引层中值为 13 的结点时，我们发现下一个结点是 17，那要查找的结点 16 肯定就在这两个结点之间。然后我们通过索引层结点的 down 指针，下降到原始链表这一层，继续遍历。这个时候，我们只需要再遍历 2 个结点，就可以找到值等于 16 的这个结点了。这样，原来如果要查找 16，需要遍历 10 个结点，现在只需要遍历 7 个结点

![enter description here](https://img.wsmpage.cn/learning/2019-10-31/1572490806002.png)

> 建立二级索引 现在我们再来查找 16，只需要遍历 6 个结点了，需要遍历的结点数量又减少了


![enter description here](https://img.wsmpage.cn/learning/2019-10-31/1572491015477.png)

> 这种链表加多级索引的结构，就是跳表

[JS实现](https://github.com/dreamapplehappy/blog/tree/master/2018/12/02)



*****
+- 快排优化
> 被分区点分开的两个分区中，数据的数量差不多
> 三数取中法 (首、尾、中间，分别取出一个数，然后对比大小，取这 3 个数的中间值作为分区点
> 随机法就是每次从要排序的区间中，随机选择一个元素作为分区点

> 在小规模数据面前，O(n2) 时间复杂度的算法并不一定比 O(nlogn) 的算法执行时间长
> 元素的个数小于等于 4 时，qsort() 就退化为插入排序，不再继续用递归来做快速排序
