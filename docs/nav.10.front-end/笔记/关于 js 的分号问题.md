---
title: 关于 js 的分号问题
time:  2019-11-21
author: wsm
mail: 1030057982@qq.com
github: https://github.com/Geronimomiao/advance
---

> 真正会导致上下行解析出问题的 token 有 5 个：括号，方括号，正则开头的斜杠，加号，减号。我还从没见过实际代码中用正则、加号、减号作为行首的情况，所以总结下来就是一句话：一行开头是括号或者方括号的时候加上分号就可以了，其他时候全部不需要。
> 其实即使是这两种情况，在实际代码中也颇为少见。
> 另外，restricted production 这个东西（也就是导致 return 后面换行会自动插入分号的机制），不管你加不加分号你都是得搞懂了才能不被坑的，和加不加分号没有什么关系

作者：尤雨溪
链接：https://www.zhihu.com/question/20298345/answer/49551142
来源：知乎


