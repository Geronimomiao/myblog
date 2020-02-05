---
title: css 面试相关
---
## 设计一个垂直居中的 div 且宽高比为 2:1
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

## 手写立方体
[推荐链接1](https://www.puritys.me/zh_cn/docs-blog/article-353-CSS-3D-%E6%97%8B%E8%BD%AC-rotate3d-%E4%B8%8E-translate3d.html)
[推荐链接2](https://www.cnblogs.com/coco1s/p/5414153.html)
transform-style:preserve-3d;  /* 使被转换的子元素保留其3D转换 */
transform: translate3d(x, y, z);  /* 沿不同的轴移动 */
transform: rotate3d(x, y, z, degree); /* 沿不同轴旋转 */

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>perspective</title>
	<style>
         .wrapper{
         	width: 50%;
         	float: left;
         }
         .cube{
         	font-size: 4em;
         	width: 2em;
         	margin: 1.5em auto;
           /* 使被转换的子元素保留其3D转换 */
         	transform-style:preserve-3d;
         	transform:rotateX(-35deg) rotateY(30deg);
         }
         .side{
         	position: absolute;
         	width: 2em;
         	height: 2em;
         	background: rgba(255,99,71,0.6);
         	border: 1px solid rgba(0,0,0,0.5);
         	color: white;
         	text-align: center;
         	line-height: 2em;
         }
         .front{
         	transform:translateZ(1em);
         }
         .bottom{
         	transform:rotateX(-90deg) translateZ(1em);
         }
         .top{
         	transform:rotateX(90deg) translateZ(1em);
         }
         .left{
         	transform:rotateY(-90deg) translateZ(1em);
         }
         .right{
         	transform:rotateY(90deg) translateZ(1em);
         }
         .back{
         	transform:translateZ(-1em);
         }
	</style>
</head>
<body>
	<div class="wrapper w1">
		<div class="cube">
			<div class="side front">1</div>
			<div class="side back">6</div>
			<div class="side right">4</div>
			<div class="side left">3</div>
			<div class="side top">5</div>
			<div class="side bottom">2</div>
		</div>
	</div>
	<div class="wrapper w2">
		<div class="cube">
			<div class="side front">1</div>
			<div class="side back">6</div>
			<div class="side right">4</div>
			<div class="side left">3</div>
			<div class="side top">5</div>
			<div class="side bottom">2</div>
		</div>
	</div>
</body>
</html>
```
