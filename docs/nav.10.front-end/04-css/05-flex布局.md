---
title: flex 布局
---

## 父元素
```css
display: flex;
flex-direction: row | row-reverse | column | column-reverse
/* 决定主轴的方向(即项目的排列方向) */
 flex-wrap: nowrap | wrap | wrap-reverse    
 /* 决定容器内项目是否可换行 */
flex-flow: <flex-direction> || <flex-wrap>
/* 两个属性的拼接   */
justify-content: flex-start | flex-end | center | space-between | space-around
 /* 定义了项目在主轴的对齐方式 */
align-items: flex-start | flex-end | center | baseline | stretch
/* 定义了项目在交叉轴上的对齐方式  */
align-content: flex-start | flex-end | center | space-between | space-around | stretch  
 /* 定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用  */
```
## 子元素
```css
 order
 /* 定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0  */
 flex-basis: <length> | auto
 /* 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间  */
flex-grow: <number>
  /* 定义项目的放大比例 */
 flex-shrink: <number>
  /* 定义了项目的缩小比例  */
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
  /* * flex-grow, flex-shrink 和 flex-basis的简写 */
 align-self: auto | flex-start | flex-end | center | baseline | stretch
  /* * 允许单个项目有与其他项目不一样的对齐方式 */
```

[传送门1](https://zh.learnlayout.com/flexbox.html)
[传送门2](https://segmentfault.com/a/1190000006741711)
