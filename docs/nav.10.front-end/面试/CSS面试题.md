---
title: css 面试相关
---
## 设计一个垂直剧中的 div 且宽高比为 2:1
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200205090550529.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzA2OTAxOA==,size_16,color_FFFFFF,t_70)
```html
<html>
<head>
<style>
  * {
      margin: 0;
      padding: 0;
    }
    .main{
      height: 100%;
      width: 100%;
      background-color: red;
    }
    .wrap {
      position: relative;
      left: 50%;
      /*   此处宽度为多少无所谓 */
      width: 40%;
      transform: translate(-50%);
      /*  不要忘记设置高度*/
      height: 100%;
    }
    .item {
      position: relative;
      top:50%;
      transform: translate(0, -50%);

      height: 0;
      /*    div 等比例展示，这个例子中的就是宽高比 1：2。我们把居中元素的 height 属性设置为 0，然后用 padding-bottom 撑开它的高度，利用的就是 padding 属性百分比的计算是以父级元素的宽度为基准的。居中元素的 width 是父级的 100%，padding-bottom: 50% 高度撑开就是父级的 宽度50%
     */
      padding-bottom: 50%;
      background-color: #fff;
    }
</style>
</head>
<body>
<div class="main">
    <div class="wrap">
      <div class="item"></div>
    </div>
</div>
</body>
</html>
```